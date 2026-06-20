from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
import uuid

from models.schemas import (
    ClinicalNotesUpdateRequest,
    HistoryCreateRequest,
    HistoryItem,
    PatientSummary,
)
from routers.auth import find_user_by_id, get_current_user_id
from services.store import list_patient_records, result_label, state

router = APIRouter(prefix="/patient", tags=["patient"])


def require_doctor(user_id: str = Depends(get_current_user_id)) -> str:
    record = find_user_by_id(user_id)
    if not record or record.role != "doctor":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Doctor access required")
    return user_id


@router.get("/history", response_model=list[HistoryItem])
def get_history(user_id: str = Depends(get_current_user_id)):
    return state.history_by_user.get(user_id, [])


@router.post("/history", response_model=HistoryItem, status_code=201)
def save_history(
    payload: HistoryCreateRequest,
    user_id: str = Depends(get_current_user_id),
):
    item = HistoryItem(
        id=str(uuid.uuid4()),
        date=datetime.now().strftime("%Y-%m-%d"),
        type="Spiral Test",
        result=result_label(payload.analysis),
        notes=payload.notes,
        analysis=payload.analysis,
    )
    history = state.history_by_user.setdefault(user_id, [])
    history.insert(0, item)
    return item


@router.get("/all", response_model=list[PatientSummary])
def list_all_patients(_doctor_id: str = Depends(require_doctor)):
    return [
        PatientSummary(
            id=record.id,
            name=record.name,
            email=record.email,
            createdAt=record.created_at,
            testHistory=state.history_by_user.get(record.id, []),
            clinicalNotes=state.clinical_notes_by_patient.get(record.id, ""),
        )
        for record in list_patient_records()
    ]


@router.put("/{patient_id}/notes", status_code=status.HTTP_204_NO_CONTENT)
def update_clinical_notes(
    patient_id: str,
    payload: ClinicalNotesUpdateRequest,
    _doctor_id: str = Depends(require_doctor),
):
    record = find_user_by_id(patient_id)
    if not record or record.role != "patient":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found")
    state.clinical_notes_by_patient[patient_id] = payload.notes
    return None
