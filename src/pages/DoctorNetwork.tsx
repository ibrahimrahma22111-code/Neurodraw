import { Chat, type ChatMessage, type ChatHandle } from '../components/Chat'
import { useRef, useState } from 'react'
import { Card, SectionTitle, Badge } from '../components/UI'

interface Doctor {
  id: string
  name: string
  specialty: string
  status: 'online' | 'away' | 'offline'
  lastSeen?: string
}

export function DoctorNetwork() {
  const chatRef = useRef<ChatHandle>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)

  const doctors: Doctor[] = [
    { id: 'd-1', name: 'Dr. Sarah Mitchell', specialty: 'Neurology', status: 'online' },
    { id: 'd-2', name: 'Dr. James Anderson', specialty: 'Movement Disorders', status: 'online' },
    { id: 'd-3', name: 'Dr. Emily Chen', specialty: 'Neurology', status: 'away', lastSeen: '5m ago' },
    { id: 'd-4', name: 'Dr. Michael Rodriguez', specialty: 'Geriatrics', status: 'offline', lastSeen: '2h ago' },
    { id: 'd-5', name: 'Dr. Lisa Thompson', specialty: 'Neurology', status: 'online' },
  ]

  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor)

  const initialMessages: ChatMessage[] = selectedDoctorData
    ? [
        {
          id: '1',
          sender: 'doctor-network',
          text: `Connected with ${selectedDoctorData.name} (${selectedDoctorData.specialty}). Start a conversation about patient cases, treatment plans, or clinical consultations.`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]
    : [
        {
          id: '1',
          sender: 'doctor-network',
          text: 'Select a doctor from the network to start a consultation or discussion about patient cases.',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]

  async function handleSend(message: string) {
    // TODO: Send message to doctor network backend API
    console.log('Sending message to doctor network:', message, selectedDoctor)
    
    // Simulate doctor response (replace with actual API call)
    setTimeout(() => {
      const doctorResponse: ChatMessage = {
        id: `doctor-${Date.now()}`,
        sender: 'doctor-network',
        text: selectedDoctorData
          ? `Thank you for your message. I've reviewed the case and would like to discuss the treatment approach. Based on the spiral test results, I recommend considering a comprehensive neurological evaluation.`
          : 'Please select a doctor to start the conversation.',
        timestamp: new Date().toLocaleTimeString(),
      }
      chatRef.current?.addMessage(doctorResponse)
    }, 2000)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6 text-white shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Doctor Network</h1>
        <p className="text-sm sm:text-base text-indigo-100">Connect with colleagues for consultations, case discussions, and peer collaboration</p>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        {/* Doctor List */}
        <Card className="border-2 border-indigo-200 bg-white/90 shadow-lg">
          <SectionTitle
            title="Network Doctors"
            description="Select a doctor to start a consultation"
          />
          <div className="mt-4 space-y-2 max-h-[600px] overflow-y-auto">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor.id)}
                className={`rounded-xl border-2 p-4 cursor-pointer transition-all ${
                  selectedDoctor === doctor.id
                    ? 'border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-md'
                    : 'border-indigo-100 bg-white hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-indigo-900 text-sm">{doctor.name}</p>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          doctor.status === 'online'
                            ? 'bg-emerald-500'
                            : doctor.status === 'away'
                              ? 'bg-amber-500'
                              : 'bg-slate-300'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-indigo-600 mt-1">{doctor.specialty}</p>
                    {doctor.lastSeen && (
                      <p className="text-xs text-slate-400 mt-1">Last seen: {doctor.lastSeen}</p>
                    )}
                  </div>
                  <Badge
                    tone={
                      doctor.status === 'online'
                        ? 'success'
                        : doctor.status === 'away'
                          ? 'warning'
                          : 'slate'
                    }
                  >
                    {doctor.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Interface */}
        <Card className="border-2 border-purple-200 bg-white/90 shadow-lg">
          <SectionTitle
            title={selectedDoctorData ? `Consultation with ${selectedDoctorData.name}` : 'Select a Doctor'}
            description={selectedDoctorData ? `Specialty: ${selectedDoctorData.specialty}` : 'Choose a doctor from the network to start a conversation'}
          />
          {selectedDoctorData ? (
            <div className="mt-4">
              <Chat
                ref={chatRef}
                title={`Chat with ${selectedDoctorData.name}`}
                description="Secure peer-to-peer consultation. All conversations are logged for clinical documentation."
                participantLabel="Doctor Network"
                initialMessages={initialMessages}
                onSend={handleSend}
              />
            </div>
          ) : (
            <div className="mt-4 rounded-xl border-2 border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 p-12 text-center">
              <p className="text-sm text-indigo-600">Select a doctor from the network to start a consultation</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

