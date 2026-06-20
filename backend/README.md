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

FastAPI server for the NeuroDraw React app: authentication, spiral analysis, patient history, notifications, and chat.

## Quick start

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

## Connect the frontend

In the project root `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_REAL_AUTH_API=true
VITE_USE_REAL_HISTORY_API=true
VITE_USE_REAL_CHAT_API=true
VITE_USE_REAL_NOTIFICATIONS_API=true
VITE_USE_REAL_SPIRAL_API=true
```

Then run the frontend: `npm run dev`

## Gemini chatbot

1. Create an API key at https://aistudio.google.com/apikey
2. Add to `backend/.env`:

```env
GEMINI_API_KEY=your-key-here
GEMINI_MODEL=gemini-2.0-flash
```

3. Restart the backend. The floating chatbot and patient AI chat use Gemini when `VITE_USE_REAL_CHAT_API=true`.

## Main endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/signup` | Sign up |
| POST | `/api/spiral/analyze` | Analyze stroke points (auth required) |
| POST | `/api/spiral/analyze/public` | Analyze without auth (testing) |
| POST | `/api/spiral/analyze-image` | Upload image (placeholder) |
| GET | `/api/patient/history` | Test history |
| POST | `/api/patient/history` | Save test result |
| GET | `/api/notifications` | Notifications |
| PUT | `/api/notifications/{id}/read` | Mark read |
| POST | `/api/chat/public/message` | Marketing chatbot (no login) |
| POST | `/api/chat/message` | AI chat (logged in) |
| POST | `/api/chat/doctor/message` | Doctor chat |
| GET | `/api/chat/doctor/history` | Doctor chat history |
