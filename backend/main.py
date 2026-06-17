from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from routers import auth, chat, notifications, patient, spiral
from services.store import seed_demo_users

app = FastAPI(
    title="NeuroDraw API",
    description="Backend for Parkinson's spiral screening — auth, analysis, chat, history.",
    version="1.0.0",
)

origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = settings.api_prefix
app.include_router(auth.router, prefix=api)
app.include_router(spiral.router, prefix=api)
app.include_router(patient.router, prefix=api)
app.include_router(notifications.router, prefix=api)
app.include_router(chat.router, prefix=api)


@app.on_event("startup")
def on_startup():
    seed_demo_users()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get(f"{api}/health")
def api_health():
    return {"status": "ok", "service": "neurodraw-api"}
