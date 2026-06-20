"""In-memory persistence for development."""

from __future__ import annotations

import uuid
from dataclasses import dataclass, field
from datetime import datetime

from models.schemas import (
    HistoryItem,
    NotificationOut,
    SpiralAnalysisResponse,
    UserOut,
)


@dataclass
class UserRecord:
    id: str
    name: str
    email: str
    role: str
    password_hash: str
    created_at: str = field(default_factory=lambda: datetime.now().isoformat())


@dataclass
class AppState:
    users_by_email: dict[str, UserRecord] = field(default_factory=dict)
    history_by_user: dict[str, list[HistoryItem]] = field(default_factory=dict)
    notifications_by_user: dict[str, list[NotificationOut]] = field(default_factory=dict)
    ai_chat_by_user: dict[str, list[dict]] = field(default_factory=dict)
    public_chat_sessions: dict[str, list[dict]] = field(default_factory=dict)
    doctor_chat_by_user: dict[str, list[dict]] = field(default_factory=dict)
    clinical_notes_by_patient: dict[str, str] = field(default_factory=dict)


state = AppState()


def seed_demo_users() -> None:
    if state.users_by_email:
        return
    from services.auth import hash_password

    demo = [
        ("patient@demo.com", "Demo Patient", "patient", "demo1234"),
        ("doctor@demo.com", "Demo Doctor", "doctor", "demo1234"),
    ]
    for email, name, role, password in demo:
        uid = str(uuid.uuid4())
        state.users_by_email[email] = UserRecord(
            id=uid,
            name=name,
            email=email,
            role=role,
            password_hash=hash_password(password),
        )
        state.history_by_user[uid] = [
            HistoryItem(
                id="h1",
                date="2024-03-15",
                type="Spiral Test",
                result="Low Tremor",
                notes="Steady usage of pen.",
            ),
            HistoryItem(
                id="h2",
                date="2024-03-10",
                type="Spiral Test",
                result="Moderate Tremor",
                notes="Slight deviation in outer loops.",
            ),
        ]
        state.notifications_by_user[uid] = [
            NotificationOut(
                id="n1",
                title="New Test Analysis",
                message="Your spiral drawing test has been analyzed.",
                date=datetime.now().strftime("%Y-%m-%d"),
                read=False,
                type="success",
            ),
        ]
        state.doctor_chat_by_user[uid] = [
            {
                "id": "1",
                "sender": "doctor",
                "text": "Hello! I can help with questions about your scans, symptoms, or treatment plan.",
                "timestamp": datetime.now().strftime("%H:%M:%S"),
            }
        ]


def user_to_out(record: UserRecord) -> UserOut:
    return UserOut(id=record.id, name=record.name, email=record.email, role=record.role)  # type: ignore[arg-type]


def list_patient_records() -> list[UserRecord]:
    return [record for record in state.users_by_email.values() if record.role == "patient"]


def result_label(analysis: SpiralAnalysisResponse) -> str:
    if analysis.parkinsonIndicator == "high":
        return "High Tremor"
    if analysis.parkinsonIndicator == "moderate":
        return "Moderate Tremor"
    return "Low Tremor"
