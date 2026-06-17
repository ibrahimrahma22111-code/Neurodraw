import { apiClient } from './apiClient'

export interface ChatbotReply {
  id: string
  message: string
  sender: 'ai'
  timestamp: string
}

const SESSION_KEY = 'neurodraw_chat_session'

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

export const chatbotService = {
  async sendMessage(message: string): Promise<ChatbotReply> {
    const useRealApi = import.meta.env.VITE_USE_REAL_CHAT_API === 'true'

    if (useRealApi) {
      return apiClient.post<ChatbotReply>('/chat/public/message', {
        message,
        session_id: getSessionId(),
      })
    }

    await new Promise((r) => setTimeout(r, 600))
    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      message:
        'Spiral drawing tests analyze tremor, smoothness, and symmetry. For medical advice, consult a neurologist. Enable the backend and VITE_USE_REAL_CHAT_API for Gemini responses.',
      timestamp: new Date().toLocaleTimeString(),
    }
  },
}
