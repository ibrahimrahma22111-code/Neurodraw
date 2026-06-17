"""Google Gemini integration for NeuroDraw chat."""

from __future__ import annotations

from config import settings

SYSTEM_INSTRUCTION = """You are NeuroDraw Assistant, a helpful guide for a Parkinson's disease screening platform.
You explain spiral drawing tests, tremor/smoothness/symmetry metrics, and how NeuroDraw supports patients and clinicians.
Be clear, compassionate, and concise. Use plain language.
Always remind users that NeuroDraw is for screening support only — not a diagnosis.
For medical decisions, advise consulting a qualified neurologist.
Do not invent test results or patient data."""

FALLBACK_REPLIES = [
    "Spiral drawing tests analyze tremor, smoothness, and symmetry — useful screening signals for Parkinson's.",
    "NeuroDraw supports clinical review but does not replace diagnosis by a neurologist.",
    "Early patterns may include irregular oscillations and reduced drawing smoothness.",
]


def is_configured() -> bool:
    return bool(settings.gemini_api_key and settings.gemini_api_key.strip())


def _to_gemini_history(turns: list[dict]) -> list[dict]:
    history = []
    for turn in turns[-20:]:
        role = turn.get("role")
        text = turn.get("text", "")
        if role in ("user", "model") and text:
            history.append({"role": role, "parts": [text]})
    return history


def _fallback_reply(message: str, extra: str = "") -> str:
    snippet = message[:80] + ("…" if len(message) > 80 else "")
    base = FALLBACK_REPLIES[len(message) % len(FALLBACK_REPLIES)]
    if extra:
        return f'Regarding "{snippet}": {base} ({extra})'
    return f'Regarding "{snippet}": {base}'


def generate_reply(user_message: str, history: list[dict] | None = None) -> str:
    history = history or []
    message = user_message.strip()
    if not message:
        return "Please enter a question about spiral screening or Parkinson's."

    if not is_configured():
        return _fallback_reply(
            message,
            "Add GEMINI_API_KEY to backend/.env, then restart the backend from the backend folder.",
        )

    try:
        import google.generativeai as genai

        genai.configure(api_key=settings.gemini_api_key.strip())
        model = genai.GenerativeModel(
            settings.gemini_model,
            system_instruction=SYSTEM_INSTRUCTION,
        )
        chat = model.start_chat(history=_to_gemini_history(history))
        response = chat.send_message(message)
        text = getattr(response, "text", None) or str(response)
        return text.strip() or FALLBACK_REPLIES[0]
    except Exception as exc:
        err = str(exc)
        print(f"[gemini] Error: {err}")
        if "429" in err or "quota" in err.lower():
            return (
                "The Gemini API quota is exceeded for this model. "
                "Wait a minute and try again, or set GEMINI_MODEL=gemini-2.5-flash in backend/.env, "
                "or enable billing in Google AI Studio."
            )
        if "API_KEY_INVALID" in err or "API key not valid" in err.lower():
            return "The Gemini API key in backend/.env is invalid. Create a new key at https://aistudio.google.com/apikey"
        return (
            "I'm having trouble reaching Gemini right now. "
            "Please try again in a moment, or consult your clinician for medical questions."
        )
