from fastapi import APIRouter, Depends, HTTPException, status

from models.schemas import NotificationOut
from routers.auth import get_current_user_id
from services.store import state

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.get("", response_model=list[NotificationOut])
def list_notifications(user_id: str = Depends(get_current_user_id)):
    return state.notifications_by_user.get(user_id, [])


@router.put("/{notification_id}/read", status_code=status.HTTP_204_NO_CONTENT)
def mark_read(notification_id: str, user_id: str = Depends(get_current_user_id)):
    notifications = state.notifications_by_user.get(user_id, [])
    for n in notifications:
        if n.id == notification_id:
            n.read = True
            return None
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found")
