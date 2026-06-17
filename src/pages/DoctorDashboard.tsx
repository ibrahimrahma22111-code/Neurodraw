import { Card, SectionTitle, Pill, Badge, PageHeader } from '../components/UI'
import { Chat } from '../components/Chat'

export function DoctorDashboard() {
  const mockPatients = [
    {
      id: 'p-1',
      name: 'Alex Johnson',
      status: 'New spiral test completed',
      lastActivity: '2h ago',
      tremorScore: 42,
      parkinsonIndicator: 'high' as const,
    },
    {
      id: 'p-2',
      name: 'Maria Gomez',
      status: 'Spiral test • Moderate indicators',
      lastActivity: 'Yesterday',
      tremorScore: 28,
      parkinsonIndicator: 'moderate' as const,
    },
    {
      id: 'p-3',
      name: 'Robert Chen',
      status: 'Awaiting test',
      lastActivity: '3 days ago',
      tremorScore: null,
      parkinsonIndicator: null,
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clinician dashboard"
        description="Review patient spiral tests, tremor metrics, and clinical notes in one workspace."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)]">
        <Card>
          <SectionTitle
            title="Patient queue"
            description="Review spiral tests and analyze tremor patterns"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Pill tone="success">Live data</Pill>
          </div>
          <div className="mt-4 space-y-3">
            {mockPatients.map((patient) => (
              <div
                key={patient.id}
                className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:border-slate-200 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">{patient.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">ID: ND-{patient.id}</p>
                    {patient.tremorScore !== null ? (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-slate-800">Tremor score: {patient.tremorScore}/100</p>
                        <p className="text-xs text-slate-500 mt-1">{patient.status}</p>
                      </div>
                    ) : (
                      <Badge tone="slate" className="mt-2">
                        Awaiting test
                      </Badge>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {patient.parkinsonIndicator ? (
                      <Badge
                        tone={
                          patient.parkinsonIndicator === 'high'
                            ? 'danger'
                            : patient.parkinsonIndicator === 'moderate'
                              ? 'warning'
                              : 'success'
                        }
                      >
                        {patient.parkinsonIndicator}
                      </Badge>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                    <p className="text-xs text-slate-400 mt-2">{patient.lastActivity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle title="Spiral analysis" description="Review drawings and provide clinical assessment" />
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
              <div className="mx-auto mb-3 h-28 w-28 rounded-full border-2 border-slate-200 bg-white" />
              <p className="text-sm font-medium text-slate-800">Patient spiral drawing</p>
              <p className="mt-1 text-xs text-slate-500">Select a patient to view analysis</p>
              <div className="mt-4 grid grid-cols-3 gap-3 rounded-lg border border-slate-100 bg-white p-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Tremor</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">42</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Smooth</p>
                  <p className="mt-1 text-lg font-semibold text-tech-700">58%</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Symmetry</p>
                  <p className="mt-1 text-lg font-semibold text-neuro-700">72%</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-neuro-50/50 p-4">
              <p className="text-sm font-semibold text-slate-900">AI analysis</p>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Tremor: 42/100 (moderate-high)
                <br />
                Pattern: Irregular oscillations detected
                <br />
                Recommendation: Clinical evaluation recommended
              </p>
            </div>
            <textarea
              rows={4}
              placeholder="Clinical notes and recommendations…"
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-neuro-400 focus:ring-2 focus:ring-neuro-100"
            />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <Chat
            title="Patient communication"
            participantLabel="Doctor ↔ Patient"
            description="Send messages and instructions"
          />
        </Card>
        <Card>
          <Chat
            title="AI clinical assistant"
            participantLabel="Clinical AI"
            description="Get second opinions and guidelines"
          />
        </Card>
      </div>
    </div>
  )
}
