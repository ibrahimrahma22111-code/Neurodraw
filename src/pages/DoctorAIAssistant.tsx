import { Chat, type ChatMessage, type ChatHandle } from '../components/Chat'
import { useRef } from 'react'
import { Card, SectionTitle, Badge } from '../components/UI'

export function DoctorAIAssistant() {
  const chatRef = useRef<ChatHandle>(null)

  const initialMessages: ChatMessage[] = [
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I\'m your Clinical AI Assistant. I can help you with:\n\n• Reviewing patient spiral test results\n• Providing evidence-based clinical guidelines\n• Suggesting differential diagnoses\n• Analyzing tremor patterns and Parkinson\'s indicators\n• Research assistance and medical literature\n\nHow can I assist you today?',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]

  async function handleSend(message: string) {
    // TODO: Send message to AI backend API
    console.log('Sending message to AI:', message)
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Based on your query about "' + message + '", here\'s my clinical analysis:\n\n• Review the tremor score patterns over time\n• Consider differential diagnoses including essential tremor, Parkinson\'s disease, and medication-induced tremors\n• Recommend follow-up imaging if indicated\n• Consider referral to movement disorder specialist for complex cases\n\nWould you like me to provide more specific guidance on any of these points?',
        timestamp: new Date().toLocaleTimeString(),
      }
      chatRef.current?.addMessage(aiResponse)
    }, 1500)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6 text-white shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">AI Clinical Assistant</h1>
        <p className="text-sm sm:text-base text-indigo-100">Get AI-powered clinical insights, second opinions, and evidence-based recommendations</p>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
            <Card className="border-2 border-purple-200 bg-white/90 shadow-lg">
              <Chat
                ref={chatRef}
                title="AI Clinical Assistant"
                description="Ask questions about Parkinson's disease diagnosis, spiral drawing test analysis, tremor patterns, and receive evidence-based clinical guidelines for Parkinson's assessment."
                participantLabel="Clinical AI"
                initialMessages={initialMessages}
                onSend={handleSend}
              />
            </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-2 border-indigo-200 bg-white/90 shadow-lg">
            <SectionTitle
              title="Quick Actions"
              description="Common AI-assisted tasks"
            />
            <div className="mt-4 space-y-2">
              <button className="w-full text-left rounded-xl border-2 border-indigo-200 bg-indigo-50 px-4 py-3 text-xs font-semibold text-indigo-900 hover:border-indigo-300 hover:bg-indigo-100 transition-colors">
                Analyze spiral drawing tremor
              </button>
              <button className="w-full text-left rounded-xl border-2 border-indigo-200 bg-indigo-50 px-4 py-3 text-xs font-semibold text-indigo-900 hover:border-indigo-300 hover:bg-indigo-100 transition-colors">
                Parkinson's diagnostic criteria
              </button>
              <button className="w-full text-left rounded-xl border-2 border-indigo-200 bg-indigo-50 px-4 py-3 text-xs font-semibold text-indigo-900 hover:border-indigo-300 hover:bg-indigo-100 transition-colors">
                Differential diagnosis (tremor)
              </button>
              <button className="w-full text-left rounded-xl border-2 border-indigo-200 bg-indigo-50 px-4 py-3 text-xs font-semibold text-indigo-900 hover:border-indigo-300 hover:bg-indigo-100 transition-colors">
                Parkinson's treatment guidelines
              </button>
            </div>
          </Card>

          <Card className="border-2 border-purple-200 bg-white/90 shadow-lg">
            <SectionTitle
              title="AI Capabilities"
              description="What the AI can help with"
            />
            <div className="mt-4 space-y-3 text-xs text-indigo-800">
              <div className="flex items-start gap-2">
                <Badge tone="sky">Analysis</Badge>
                <span>Spiral drawing pattern recognition and Parkinson's tremor scoring</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge tone="violet">Guidelines</Badge>
                <span>Parkinson's disease diagnostic and treatment guidelines</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge tone="rose">Diagnosis</Badge>
                <span>Parkinson's differential diagnosis (essential tremor, etc.)</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge tone="success">Research</Badge>
                <span>Parkinson's research and spiral drawing test literature</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

