from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from models.schemas import AuthLoginRequest, AuthResponse, AuthSignupRequest, UserOut
from services import auth as auth_service
from services.store import seed_demo_users, state, user_to_out

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer(auto_error=False)


def get_current_user_id(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
) -> str:
    if not credentials or credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    user_id = auth_service.decode_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return user_id


def find_user_by_id(user_id: str):
    for record in state.users_by_email.values():
        if record.id == user_id:
            return record
    return None


@router.post("/login", response_model=AuthResponse)
def login(payload: AuthLoginRequest):
    seed_demo_users()
    record = state.users_by_email.get(payload.email.lower())
    if not record or not auth_service.verify_password(payload.password, record.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if record.role != payload.role:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Role mismatch")
    token = auth_service.create_access_token(record.id)
    return AuthResponse(user=user_to_out(record), token=token)


@router.post("/signup", response_model=AuthResponse)
def signup(payload: AuthSignupRequest):
    seed_demo_users()
    email = payload.email.lower()
    if email in state.users_by_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    import uuid

    record_id = str(uuid.uuid4())
    from services.auth import hash_password
    from services.store import UserRecord

    state.users_by_email[email] = UserRecord(
        id=record_id,
        name=payload.name,
        email=email,
        role=payload.role,
        password_hash=hash_password(payload.password),
    )
    state.history_by_user[record_id] = []
    state.notifications_by_user[record_id] = []
    state.doctor_chat_by_user[record_id] = []

    token = auth_service.create_access_token(record_id)
    return AuthResponse(user=user_to_out(state.users_by_email[email]), token=token)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout():
    return None


@router.get("/me", response_model=UserOut)
def me(user_id: str = Depends(get_current_user_id)):
    record = find_user_by_id(user_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user_to_out(record)
