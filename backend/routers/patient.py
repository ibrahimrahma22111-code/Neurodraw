from datetime import datetime

from fastapi import APIRouter, Depends
import uuid

from models.schemas import HistoryCreateRequest, HistoryItem
from routers.auth import get_current_user_id
from services.store import result_label, state

router = APIRouter(prefix="/patient", tags=["patient"])


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
