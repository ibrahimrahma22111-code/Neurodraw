import { SpiralCanvas } from '../components/SpiralCanvas'
import { Card, SectionTitle, Pill, Badge } from '../components/UI'
import { Chat, type ChatHandle, type ChatMessage } from '../components/Chat'
import { ImageUpload } from '../components/ImageUpload'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { usePatients } from '../context/PatientContext'
import { historyService } from '../services/historyService'
import { analysisService } from '../services/analysisService'
import { notificationService, type Notification } from '../services/notificationService'
// import { chatService } from '../services/chatService'
import { doctorChatService } from '../services/doctorChatService'
import { chatService } from '../services/chatService'

interface SpiralAnalysis {
  tremorScore: number
  smoothness: number
  symmetry: number
  speed: number
  parkinsonIndicator: 'low' | 'moderate' | 'high'
  date?: string
}

export function PatientDashboard() {
  const { user } = useAuth()
  const { updatePatientTest } = usePatients()
  const [latestAnalysis, setLatestAnalysis] = useState<SpiralAnalysis | null>(null)
  const [testHistory, setTestHistory] = useState<SpiralAnalysis[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])

  const aiChatRef = useRef<ChatHandle>(null)
  const doctorChatRef = useRef<ChatHandle>(null)
  const [doctorChatHistory, setDoctorChatHistory] = useState<ChatMessage[]>([])


  // Load initial data
  useEffect(() => {
    async function loadData() {
      try {
        // Load history
        const historyData = await historyService.getPatientHistory()

        // Adapt Mock Service Data to UI
        const adaptedHistory: SpiralAnalysis[] = historyData.map((h) => {
          if (h.analysis) {
            return { ...h.analysis, date: h.date }
          }
          const indicator =
            h.result === 'Low Tremor' || h.result === 'Normal'
              ? 'low'
              : h.result === 'High Tremor'
                ? 'high'
                : 'moderate'
          return {
            tremorScore: indicator === 'high' ? 55 : indicator === 'moderate' ? 30 : 10,
            smoothness: indicator === 'high' ? 45 : 75,
            symmetry: 80,
            speed: 5,
            parkinsonIndicator: indicator,
            date: h.date,
          }
        })

        setTestHistory(adaptedHistory)
        if (adaptedHistory.length > 0) {
          setLatestAnalysis(adaptedHistory[0])
        }

        // Load notifications
        const notifs = await notificationService.getNotifications()
        setNotifications(notifs)

        // Load doctor chat history
        const doctorHistory = await doctorChatService.getHistory();
        setDoctorChatHistory(doctorHistory);

      } catch (err) {
        console.error('Failed to load dashboard data', err)
      }
    }
    loadData()
  }, [])


  async function handleSpiralComplete(analysis: SpiralAnalysis) {
    const analysisWithDate = { ...analysis, date: new Date().toLocaleDateString() }
    setLatestAnalysis(analysisWithDate)
    setTestHistory((prev) => [analysisWithDate, ...prev.slice(0, 4)])

    // Save to patient context if patient exists
    if (user) {
      updatePatientTest(user.id, analysis)
    }

    try {
      await analysisService.saveToHistory(analysis)
    } catch (err) {
      console.error('Failed to save history', err)
    }
  }

  async function handleImageUpload(file: File) {
    // TODO: Send to backend API
    console.log('Image uploaded:', file.name, file.size)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  // Chat Handlers
  async function handleAiSend(message: string) {
    try {
      const response = await chatService.sendMessage(message)
      aiChatRef.current?.addMessage(response)
    } catch (error) {
      console.error(error)
      aiChatRef.current?.addMessage({
        id: 'err', sender: 'ai', text: 'Error connecting to AI.', timestamp: new Date().toLocaleTimeString()
      })
    }
  }

  async function handleDoctorSend(message: string) {
    try {
      const response = await doctorChatService.sendMessage(message)
      doctorChatRef.current?.addMessage(response)
    } catch (error) {
      console.error(error)
      doctorChatRef.current?.addMessage({
        id: 'err', sender: 'doctor', text: 'Error sending message.', timestamp: new Date().toLocaleTimeString()
      })
    }
  }

  // Calculate responsive canvas size
  const [canvasSize, setCanvasSize] = useState(600)

  useEffect(() => {
    const updateCanvasSize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setCanvasSize(Math.min(width - 64, 400)) // Mobile: full width minus padding
      } else if (width < 1024) {
        setCanvasSize(500) // Tablet
      } else {
        setCanvasSize(600) // Desktop
      }
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [])

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Notifications Section */}
      {notifications.length > 0 && (
        <Card>
          <SectionTitle title="Notifications" description="Recent updates and alerts." />
          <div className="mt-4 space-y-3">
            {notifications.map(n => (
              <div key={n.id} className={`flex items-start gap-3 rounded-xl p-3 ${n.read ? 'bg-slate-50' : 'bg-sky-50 border border-sky-100'}`}>
                <div className={`mt-1 h-2 w-2 rounded-full ${n.type === 'alert' ? 'bg-rose-500' : n.type === 'success' ? 'bg-emerald-500' : 'bg-sky-500'}`} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                  <p className="text-xs text-slate-600">{n.message}</p>
                  <p className="mt-1 text-[10px] text-slate-400">{n.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <Card className="hover-lift">
            <SectionTitle
              title="Spiral Drawing Test"
              description="Draw a spiral from the center outward. This test helps detect early signs of Parkinson's disease by analyzing tremor, smoothness, and symmetry."
            />
            <div className="mt-4 animate-slide-up overflow-x-auto">
              <div className="flex justify-center">
                <SpiralCanvas onComplete={handleSpiralComplete} width={canvasSize} height={canvasSize} />
              </div>
            </div>
          </Card>
          <div className="animate-slide-up">
            <ImageUpload onSubmit={handleImageUpload} />
          </div>
          <Card className="hover-lift">
            <SectionTitle
              title="Latest Test Results"
              description="Your most recent spiral drawing analysis with AI-powered Parkinson's indicators."
            />
            {latestAnalysis ? (
              <div className="mt-4 space-y-3 animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-slate-500">Tremor Score</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">{latestAnalysis.tremorScore}/100</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3">
                    <p className="text-emerald-700">Smoothness</p>
                    <p className="mt-1 text-lg font-bold text-emerald-600">{latestAnalysis.smoothness}%</p>
                  </div>
                </div>
                <div className="rounded-xl bg-slate-900 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-sky-300">
                    Parkinson's Risk Indicator
                  </p>
                  <Badge
                    tone={
                      latestAnalysis.parkinsonIndicator === 'high'
                        ? 'danger'
                        : latestAnalysis.parkinsonIndicator === 'moderate'
                          ? 'warning'
                          : 'success'
                    }
                    className="mt-2"
                  >
                    {latestAnalysis.parkinsonIndicator.toUpperCase()} RISK
                  </Badge>
                  <p className="mt-2 text-xs text-slate-300">
                    {latestAnalysis.parkinsonIndicator === 'high'
                      ? 'Significant tremor detected. Your doctor will review these results and provide guidance.'
                      : latestAnalysis.parkinsonIndicator === 'moderate'
                        ? 'Moderate irregularities observed. Continue monitoring and follow up with your doctor.'
                        : 'Drawing appears smooth with low tremor indicators. Keep up regular monitoring.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                <Pill tone="warning">No test completed yet</Pill>
                <span>Complete a spiral drawing test above to see your results.</span>
              </div>
            )}
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <SectionTitle
              title="Test History"
              description="Track your spiral drawing tests over time to monitor changes."
            />
            {testHistory.length > 0 ? (
              <ol className="space-y-3 text-xs text-slate-600">
                {testHistory.map((test, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-sky-500" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-800">{test.date}</p>
                        <Badge
                          tone={
                            test.parkinsonIndicator === 'high'
                              ? 'danger'
                              : test.parkinsonIndicator === 'moderate'
                                ? 'warning'
                                : 'success'
                          }
                        >
                          {test.parkinsonIndicator}
                        </Badge>
                      </div>
                      <p className="mt-1 text-slate-500">
                        Tremor: {test.tremorScore}/100 • Smoothness: {test.smoothness}% • Symmetry: {test.symmetry}%
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-xs text-slate-500">
                No test history yet. Complete your first spiral drawing test to start tracking.
              </p>
            )}
          </Card>
          {/* Doctor Chat Widget */}
          <Chat
            ref={doctorChatRef}
            title="Chat with your doctor"
            participantLabel="Secure doctor chat"
            description="Ask questions about your scans, symptoms, and next steps."
            initialMessages={doctorChatHistory.length > 0 ? doctorChatHistory : undefined}
            onSend={handleDoctorSend}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Chat Widget */}
        <Chat
          ref={aiChatRef}
          title="Ask NeuroDraw AI"
          participantLabel="AI health assistant"
          description="Get educational explanations about imaging terms and findings. This is not a substitute for medical care."
          onSend={handleAiSend}
          initialMessages={[
            { id: '1', sender: 'ai', text: 'Hello! How can I help you today?', timestamp: new Date().toLocaleTimeString() }
          ]}
        />
        <Card>
          <SectionTitle
            title="Follow-up guidance"
            description="Your doctor's recommendations and next steps will appear here."
          />
          <ul className="space-y-2 text-xs text-slate-600">
            {latestAnalysis?.parkinsonIndicator === 'high' ? (
              <>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-4 w-4 rounded-full border-2 border-rose-500 bg-rose-50" />
                  <span>
                    <strong className="text-slate-900">Schedule a follow-up appointment</strong> with your neurologist to discuss these results.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-4 w-4 rounded-full border border-slate-300" />
                  <span>Continue monitoring with regular spiral tests.</span>
                </li>
              </>
            ) : latestAnalysis?.parkinsonIndicator === 'moderate' ? (
              <>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-4 w-4 rounded-full border-2 border-amber-500 bg-amber-50" />
                  <span>
                    <strong className="text-slate-900">Monitor regularly</strong> and repeat the test in 2-4 weeks.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-4 w-4 rounded-full border border-slate-300" />
                  <span>Discuss results with your doctor during your next visit.</span>
                </li>
              </>
            ) : (
              <li className="flex items-start gap-2">
                <span className="mt-1 h-4 w-4 rounded-full border border-slate-300" />
                <span>No immediate follow-up needed. Continue regular monitoring as recommended by your doctor.</span>
              </li>
            )}
          </ul>
        </Card>
      </div>
    </div>
  )
}
