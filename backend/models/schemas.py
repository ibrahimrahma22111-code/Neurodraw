from typing import Literal

from pydantic import BaseModel, EmailStr, Field


class UserOut(BaseModel):
    id: str
    name: str
    email: str
    role: Literal["patient", "doctor"]


class AuthLoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: Literal["patient", "doctor"]


class AuthSignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Literal["patient", "doctor"]


class AuthResponse(BaseModel):
    user: UserOut
    token: str


class StrokePoint(BaseModel):
    x: float
    y: float
    timestamp: float


class SpiralAnalyzeRequest(BaseModel):
    points: list[StrokePoint] = Field(default_factory=list)


class SpiralAnalysisResponse(BaseModel):
    tremorScore: int
    smoothness: int
    symmetry: int
    speed: int
    parkinsonIndicator: Literal["low", "moderate", "high"]


class HistoryItem(BaseModel):
    id: str
    date: str
    type: str
    result: str
    notes: str | None = None
    analysis: SpiralAnalysisResponse | None = None


class HistoryCreateRequest(BaseModel):
    analysis: SpiralAnalysisResponse
    notes: str | None = None


class PatientSummary(BaseModel):
    id: str
    name: str
    email: str
    age: int | None = None
    createdAt: str
    testHistory: list[HistoryItem] = Field(default_factory=list)
    clinicalNotes: str = ""


class ClinicalNotesUpdateRequest(BaseModel):
    notes: str


class NotificationOut(BaseModel):
    id: str
    title: str
    message: str
    date: str
    read: bool
    type: Literal["info", "alert", "success"]


class ChatMessageRequest(BaseModel):
    message: str


class PublicChatRequest(BaseModel):
    message: str
    session_id: str | None = None


class ChatMessageResponse(BaseModel):
    id: str
    message: str
    sender: Literal["ai", "doctor"]
    timestamp: str


class DoctorChatHistoryItem(BaseModel):
    id: str
    sender: Literal["user", "doctor"]
    text: str
    timestamp: str
