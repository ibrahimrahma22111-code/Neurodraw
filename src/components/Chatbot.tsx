import { useState, type FormEvent } from 'react'
import { chatbotService } from '../services/chatbotService'

interface ChatbotMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatbotMessage[]>([
    {
      id: '1',
      text: "Hello. I'm the NeuroDraw assistant powered by Gemini. Ask me about spiral screening or Parkinson's.",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage: ChatbotMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setError(null)
    setIsLoading(true)

    try {
      const response = await chatbotService.sendMessage(text)
      const botMessage: ChatbotMessage = {
        id: response.id,
        text: response.message,
        sender: 'bot',
        timestamp: response.timestamp,
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      console.error(err)
      setError('Could not reach the assistant. Is the backend running on port 3000?')
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          text: 'Sorry, I could not connect. Please try again or check that the API server is running.',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-xl bg-neuro-800 text-white shadow-lg transition-colors hover:bg-neuro-900"
        aria-label="Open assistant"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-900 px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold text-white">NeuroDraw Assistant</h3>
              <p className="text-[11px] text-slate-400">Powered by Gemini · Educational only</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Close assistant"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="h-72 space-y-3 overflow-y-auto p-4 bg-slate-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 ${
                    msg.sender === 'user' ? 'bg-neuro-800 text-white' : 'border border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <p className="mt-1 text-[10px] opacity-60">{msg.timestamp}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <p className="text-xs text-slate-400 animate-pulse">Gemini is thinking…</p>
            )}
            {error && <p className="text-xs text-rose-600">{error}</p>}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-100 bg-white p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                disabled={isLoading}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-neuro-400 focus:ring-2 focus:ring-neuro-100 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-lg bg-neuro-800 px-3 py-2 text-sm font-semibold text-white hover:bg-neuro-900 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
