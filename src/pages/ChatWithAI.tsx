import { Chat, type ChatMessage, type ChatHandle } from '../components/Chat'
import { useRef } from 'react'
import { chatService } from '../services/chatService'

export function ChatWithAI() {
  const chatRef = useRef<ChatHandle>(null)

  const initialMessages: ChatMessage[] = [
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I\'m NeuroDraw AI, your Parkinson\'s education assistant. I can help explain:\n\n• How spiral drawing tests detect Parkinson\'s disease\n• Understanding tremor patterns and movement analysis\n• Interpreting spiral test results (tremor score, smoothness, symmetry)\n• Early signs and symptoms of Parkinson\'s disease\n• The science behind spiral drawing as a screening tool\n\nPlease note: I provide educational information only and cannot replace professional medical advice or diagnosis.',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]

  async function handleSend(message: string) {
    try {
      // Use the chatService to send the message
      // This will automatically handle the mock vs real API logic based on env vars
      const aiResponse = await chatService.sendMessage(message)
      chatRef.current?.addMessage(aiResponse)
    } catch (error) {
      console.error('Error sending message:', error)
      // Optionally add an error message to the chat
      chatRef.current?.addMessage({
        id: `error-${Date.now()}`,
        sender: 'ai',
        text: 'Sorry, I am having trouble connecting right now. Please try again later.',
        timestamp: new Date().toLocaleTimeString(),
      })
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="max-w-4xl mx-auto w-full">
        <Chat
          ref={chatRef}
          title="Ask NeuroDraw AI"
          description="Get educational explanations about Parkinson's disease, spiral drawing tests, and test results. This is not a substitute for medical care."
          participantLabel="AI health assistant"
          initialMessages={initialMessages}
          onSend={handleSend}
        />
      </div>
    </div>
  )
}

