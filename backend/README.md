---
title: NeuroDraw Backend
emoji: 🧠
colorFrom: blue
colorTo: purple
sdk: docker
app_port: 7860
pinned: false
---

# NeuroDraw Backend

FastAPI server for the NeuroDraw React app: authentication, spiral analysis (including a real TensorFlow/PCA/SVM model for drawn-image screening), patient history, notifications, and Gemini-powered chat.

## Architecture

```
backend/
├── main.py              # App setup: CORS, routers, startup checks, /health
├── config.py             # Settings loaded from backend/.env (or real env vars in deployment)
├── models/schemas.py      # Pydantic request/response models
├── routers/               # One file per feature area, all mounted under /api
│   ├── auth.py             # login, signup, logout, me
│   ├── spiral.py           # spiral analysis (stroke points + image upload)
│   ├── patient.py          # test history
│   ├── notifications.py    # notifications list/read
│   └── chat.py             # AI chat (Gemini), public chatbot, doctor chat
├── services/
│   ├── auth.py              # password hashing, JWT encode/decode
│   ├── store.py              # in-memory data store + demo user seeding
│   ├── spiral_analyzer.py    # heuristic analysis from raw stroke points
│   ├── ml_spiral_analyzer.py # real CNN+PCA+SVM model for uploaded drawing images
│   └── gemini.py              # Gemini API integration + fallback replies
└── ml_models/              # trained model artifacts (.h5, .joblib) used by ml_spiral_analyzer.py
```

**Data is in-memory only** — `services/store.py` holds everything (users, history, notifications, chat history) in plain Python dicts seeded fresh on startup. Restarting the process (or the container, e.g. after a Hugging Face Space goes idle) wipes all data back to the two demo accounts. There is no database; if you need real persistence, that's the next thing to add.

## Quick start (local)

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
copy .env.example .env
uvicorn main:app --reload --port 3000
```

API base URL: **http://localhost:3000/api**

Interactive docs: **http://localhost:3000/docs**

## Demo accounts

| Email | Password | Role |
|-------|----------|------|
| patient@demo.com | demo1234 | patient |
| doctor@demo.com | demo1234 | doctor |

## Environment variables

Set these in `backend/.env` locally, or as real environment variables/secrets on whatever host runs the container (Hugging Face Space secrets, etc.) — never commit `.env` itself.

| Variable | Default | Purpose |
|---|---|---|
| `SECRET_KEY` | `dev-secret-change-in-production` | JWT signing key — set a real random value outside local dev |
| `CORS_ORIGINS` | `http://localhost:5173,...` | Comma-separated list of allowed frontend origins |
| `GEMINI_API_KEY` | unset | Without this, chat falls back to a static reply instead of calling Gemini |
| `GEMINI_MODEL` | `gemini-2.5-flash` | Gemini model name |

## Connect the frontend

In the project root, set these on whatever host serves the frontend (Vercel env vars, or root `.env` for local dev):

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_REAL_AUTH_API=true
VITE_USE_REAL_HISTORY_API=true
VITE_USE_REAL_NOTIFICATIONS_API=true
VITE_USE_REAL_SPIRAL_API=true
```

(AI chat always calls the real backend regardless of any flag — see `src/services/chatService.ts`.)

Then run the frontend: `npm run dev`

## Deploying

The backend runs as a Docker container (see `Dockerfile`) and is deployed to a free-tier [Hugging Face Space](https://huggingface.co/spaces) (Docker SDK, CPU basic) rather than Vercel — it needs TensorFlow/OpenCV/scikit-learn, which don't fit in a serverless function's size limit.

- `.github/workflows/sync-to-hf-space.yml` auto-pushes `backend/` to the Space on every push to `main` that touches `backend/**` (or via manual `workflow_dispatch`). It converts `*.h5`/`*.joblib` model files to Git LFS before pushing, since HF rejects large binaries as plain git blobs.
- Requires two GitHub repo secrets: `HF_TOKEN` (a Hugging Face write-access token) and `HF_SPACE` (`username/space-name`).
- On the Space itself, set `GEMINI_API_KEY` and `CORS_ORIGINS` under Settings → Variables and secrets.
- Free Spaces sleep after inactivity and cold-start on the next request (a few seconds delay) — and since storage is in-memory only, a restart resets all data.

## Main endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/signup` | — | Create account |
| POST | `/api/auth/login` | — | Login, returns JWT |
| POST | `/api/auth/logout` | — | No-op (stateless JWT) |
| GET | `/api/auth/me` | required | Current user |
| POST | `/api/spiral/analyze` | required | Heuristic analysis from stroke points |
| POST | `/api/spiral/analyze/public` | — | Same, unauthenticated (testing) |
| POST | `/api/spiral/analyze-image` | required | Real ML model analysis of an uploaded drawing image |
| GET | `/api/patient/history` | required | Test history |
| POST | `/api/patient/history` | required | Save a test result |
| GET | `/api/notifications` | required | List notifications |
| PUT | `/api/notifications/{id}/read` | required | Mark one as read |
| POST | `/api/chat/public/message` | — | Marketing chatbot (Gemini) |
| POST | `/api/chat/message` | required | Patient AI chat (Gemini) |
| DELETE | `/api/chat/history` | required | Clear AI chat history |
| POST | `/api/chat/doctor/message` | required | Doctor chat (static canned replies — not AI) |
| GET | `/api/chat/doctor/history` | required | Doctor chat history |
| GET | `/health`, `/api/health` | — | Health check |
