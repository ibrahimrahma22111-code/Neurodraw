import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import type { FormEvent } from 'react'
import { Card, SectionTitle, Badge } from './UI'

export type ChatParticipant = 'patient' | 'doctor' | 'ai' | 'doctor-network'

export interface ChatMessage {
  id: string
  sender: ChatParticipant
  text: string
  timestamp: string
}

interface ChatProps {
  title: string
  description?: string
  participantLabel: string
  initialMessages?: ChatMessage[]
  onSend?: (message: string) => Promise<void> | void
}

export interface ChatHandle {
  addMessage: (message: ChatMessage) => void
}

export const Chat = forwardRef<ChatHandle, ChatProps>(
  ({ title, description, participantLabel, initialMessages, onSend }, ref) => {
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages ?? [])
    const [input, setInput] = useState('')
    const [isSending, setIsSending] = useState(false)

    useEffect(() => {
      if (initialMessages) {
        setMessages(initialMessages)
      }
    }, [initialMessages])

    useImperativeHandle(ref, () => ({
      addMessage: (message: ChatMessage) => {
        setMessages((prev) => [...prev, message])
      },
    }))

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!input.trim()) return

    const text = input.trim()
    const outgoing: ChatMessage = {
      id: `local-${Date.now()}`,
      sender: 'patient',
      text,
      timestamp: new Date().toLocaleTimeString(),
    }
    setMessages((prev) => [...prev, outgoing])
    setInput('')

    if (!onSend) return

    try {
      setIsSending(true)
      await onSend(text)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Card className="flex h-full flex-col">
      <SectionTitle title={title} description={description} />

      <div className="mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge tone="sky">{participantLabel}</Badge>
          <span className="hidden sm:inline">Secure, logged for clinical review</span>
        </div>
        {isSending ? <span className="text-sky-600">Sending…</span> : null}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto rounded-xl bg-slate-50 p-2 sm:p-3 text-xs min-h-[200px] sm:min-h-[300px]">
        {messages.length === 0 ? (
          <p className="text-center text-[11px] text-slate-400">
            No messages yet. Start the conversation below.
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-sm ${
                  msg.sender === 'patient'
                    ? 'rounded-br-sm bg-sky-600 text-white'
                    : msg.sender === 'ai'
                      ? 'rounded-bl-sm bg-emerald-50 text-emerald-900'
                      : 'rounded-bl-sm bg-white text-slate-900'
                }`}
              >
                <p className="text-[11px] font-semibold opacity-80">
                  {msg.sender === 'patient'
                    ? 'You'
                    : msg.sender === 'doctor'
                      ? 'Doctor'
                      : msg.sender === 'ai'
                        ? 'NeuroDraw AI'
                        : 'Doctor Network'}
                </p>
                <p className="mt-0.5 leading-snug">{msg.text}</p>
                <p className="mt-1 text-[10px] opacity-70">{msg.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex items-end gap-2">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type your message…"
          rows={2}
          className="flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-900 outline-none ring-sky-100 placeholder:text-slate-400 focus:ring-2"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="inline-flex h-8 sm:h-9 items-center justify-center rounded-full bg-sky-600 px-3 sm:px-4 text-xs font-semibold text-white shadow-sm hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
        >
          <span className="hidden sm:inline">Send</span>
          <span className="sm:hidden">→</span>
        </button>
      </form>
    </Card>
  )
})

Chat.displayName = 'Chat'


