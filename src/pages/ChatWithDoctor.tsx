import { Chat, type ChatMessage, type ChatHandle } from '../components/Chat'
import { useRef } from 'react'

import { doctorChatService } from '../services/doctorChatService'
import { useState, useEffect } from 'react'

export function ChatWithDoctor() {
  const chatRef = useRef<ChatHandle>(null)
  const [initialMessages, setInitialMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    // Load initial history
    async function loadHistory() {
      const history = await doctorChatService.getHistory();
      setInitialMessages(history);
    }
    loadHistory();
  }, []);

  async function handleSend(message: string) {
    try {
      const response = await doctorChatService.sendMessage(message)
      chatRef.current?.addMessage(response)
    } catch (error) {
      console.error('Error sending message:', error)
      chatRef.current?.addMessage({
        id: `error-${Date.now()}`,
        sender: 'doctor',
        text: 'Message failed to send. Please try again.',
        timestamp: new Date().toLocaleTimeString(),
      })
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="max-w-4xl mx-auto w-full">
        <Chat
          ref={chatRef}
          title="Chat with your doctor"
          description="Secure messaging with your healthcare provider. All conversations are logged for clinical review and medical records."
          participantLabel="Secure doctor chat"
          initialMessages={initialMessages}
          onSend={handleSend}
        />
      </div>
    </div>
  )
}

