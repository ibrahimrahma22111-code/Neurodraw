import json
import os
import uuid
from datetime import datetime
from http.server import BaseHTTPRequestHandler

import google.generativeai as genai

SYSTEM_INSTRUCTION = """You are NeuroDraw Assistant, a helpful guide for a Parkinson's disease screening platform.
You explain spiral drawing tests, tremor/smoothness/symmetry metrics, and how NeuroDraw supports patients and clinicians.
Be clear, compassionate, and concise. Use plain language.
Always remind users that NeuroDraw is for screening support only — not a diagnosis.
For medical decisions, advise consulting a qualified neurologist.
Do not invent test results or patient data."""

FALLBACK_REPLY = (
    "I'm having trouble reaching Gemini right now. "
    "Please try again in a moment, or consult your clinician for medical questions."
)


def generate_reply(message: str) -> str:
    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not api_key:
        return (
            'Regarding "' + message[:80] + '": Spiral drawing tests analyze tremor, '
            "smoothness, and symmetry — useful screening signals for Parkinson's. "
            "(Set GEMINI_API_KEY in the Vercel project settings to enable live AI replies.)"
        )

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(
            os.environ.get("GEMINI_MODEL", "gemini-2.5-flash"),
            system_instruction=SYSTEM_INSTRUCTION,
        )
        chat = model.start_chat(history=[])
        response = chat.send_message(message)
        text = getattr(response, "text", None)
        return (text or "").strip() or FALLBACK_REPLY
    except Exception as exc:  # noqa: BLE001
        err = str(exc)
        print(f"[gemini] error: {err}")
        if "429" in err or "quota" in err.lower():
            return "The Gemini API quota is exceeded for this model. Please wait a minute and try again."
        if "API_KEY_INVALID" in err or "api key not valid" in err.lower():
            return "The Gemini API key configured on the server is invalid."
        return FALLBACK_REPLY


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0) or 0)
        raw = self.rfile.read(length) if length else b"{}"
        try:
            payload = json.loads(raw or b"{}")
        except json.JSONDecodeError:
            payload = {}

        message = str(payload.get("message") or "").strip()

        if not message:
            reply = "Please enter a question about spiral screening or Parkinson's."
        else:
            reply = generate_reply(message)

        body = json.dumps(
            {
                "id": f"ai-{uuid.uuid4().hex[:8]}",
                "sender": "ai",
                "message": reply,
                "timestamp": datetime.now().strftime("%H:%M:%S"),
            }
        ).encode("utf-8")

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(body)
