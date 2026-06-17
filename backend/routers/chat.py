from datetime import datetime
import uuid

from fastapi import APIRouter, Depends, status

from models.schemas import (
    ChatMessageRequest,
    ChatMessageResponse,
    DoctorChatHistoryItem,
    PublicChatRequest,
)
from routers.auth import get_current_user_id
from services.gemini import generate_reply
from services.store import state

router = APIRouter(prefix="/chat", tags=["chat"])


def _append_turn(history: list[dict], role: str, text: str) -> None:
    history.append({"role": role, "text": text})
    # Keep last 40 turns (20 exchanges)
    if len(history) > 40:
        del history[:-40]


def _build_response(text: str, sender: str = "ai") -> ChatMessageResponse:
    return ChatMessageResponse(
        id=f"{sender}-{uuid.uuid4().hex[:8]}",
        message=text,
        sender=sender,  # type: ignore[arg-type]
        timestamp=datetime.now().strftime("%H:%M:%S"),
    )


@router.post("/public/message", response_model=ChatMessageResponse)
def public_message(payload: PublicChatRequest):
    """Marketing-site chatbot — no login required."""
    session_id = payload.session_id or str(uuid.uuid4())
    history = state.public_chat_sessions.setdefault(session_id, [])

    _append_turn(history, "user", payload.message.strip())
    reply = generate_reply(payload.message, history)
    _append_turn(history, "model", reply)

    return _build_response(reply)


@router.post("/message", response_model=ChatMessageResponse)
def ai_message(payload: ChatMessageRequest, user_id: str = Depends(get_current_user_id)):
    history = state.ai_chat_by_user.setdefault(user_id, [])

    _append_turn(history, "user", payload.message.strip())
    reply = generate_reply(payload.message, history)
    _append_turn(history, "model", reply)

    return _build_response(reply)


@router.delete("/history", status_code=status.HTTP_204_NO_CONTENT)
def clear_ai_history(user_id: str = Depends(get_current_user_id)):
    state.ai_chat_by_user[user_id] = []
    return None


@router.post("/doctor/message", response_model=ChatMessageResponse)
def doctor_message(payload: ChatMessageRequest, user_id: str = Depends(get_current_user_id)):
    import random

    replies = [
        "Thank you for your message. I will review your latest spiral test shortly.",
        "Please schedule a follow-up if symptoms have changed.",
        "Your recent metrics are available in the clinician dashboard.",
    ]

    user_entry = {
        "id": f"u-{uuid.uuid4().hex[:8]}",
        "sender": "user",
        "text": payload.message,
        "timestamp": datetime.now().strftime("%H:%M:%S"),
    }
    doctor_entry = {
        "id": f"d-{uuid.uuid4().hex[:8]}",
        "sender": "doctor",
        "text": random.choice(replies),
        "timestamp": datetime.now().strftime("%H:%M:%S"),
    }
    chat = state.doctor_chat_by_user.setdefault(user_id, [])
    chat.extend([user_entry, doctor_entry])

    return ChatMessageResponse(
        id=doctor_entry["id"],
        message=doctor_entry["text"],
        sender="doctor",
        timestamp=doctor_entry["timestamp"],
    )


@router.get("/doctor/history", response_model=list[DoctorChatHistoryItem])
def doctor_history(user_id: str = Depends(get_current_user_id)):
    raw = state.doctor_chat_by_user.get(user_id, [])
    return [DoctorChatHistoryItem(**item) for item in raw]
