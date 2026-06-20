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
    return apiClient.post<ChatbotReply>('/chat/public/message', {
      message,
      session_id: getSessionId(),
    })
  },
}
