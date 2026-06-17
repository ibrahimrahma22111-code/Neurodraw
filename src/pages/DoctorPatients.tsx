import { Card, SectionTitle, Pill, Badge } from '../components/UI'
import { useState, useMemo } from 'react'
import { usePatients } from '../context/PatientContext'
import type { Patient } from '../context/PatientContext'

export function DoctorPatients() {
  const { patients, getPatientById } = usePatients()
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)

  // Format last activity time
  const formatLastActivity = (createdAt: string, lastActivity: string) => {
    if (lastActivity === 'Just now') return 'Just now'
    
    // Check if patient has test history (more recent activity)
    const patient = patients.find(p => p.createdAt === createdAt)
    if (patient?.testHistory && patient.testHistory.length > 0) {
      // Use most recent test date
      const testDate = new Date(patient.testHistory[0].date)
      const now = new Date()
      const diffMs = now.getTime() - testDate.getTime()
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)
      
      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      return `${diffDays}d ago`
    }
    
    // Otherwise use creation time
    const created = new Date(createdAt)
    const now = new Date()
    const diffMs = now.getTime() - created.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  // Sort patients by most recent activity (test results or signup)
  const sortedPatients = useMemo(() => {
    return [...patients].sort((a, b) => {
      // Prioritize patients with test results
      const aHasTests = a.testHistory && a.testHistory.length > 0
      const bHasTests = b.testHistory && b.testHistory.length > 0
      
      if (aHasTests && !bHasTests) return -1
      if (!aHasTests && bHasTests) return 1
      
      // If both have tests, sort by most recent test
      if (aHasTests && bHasTests) {
        const aTestDate = new Date(a.testHistory![0].date).getTime()
        const bTestDate = new Date(b.testHistory![0].date).getTime()
        return bTestDate - aTestDate
      }
      
      // Otherwise sort by creation time
      const aTime = new Date(a.createdAt).getTime()
      const bTime = new Date(b.createdAt).getTime()
      return bTime - aTime
    })
  }, [patients])

  const selectedPatientData = selectedPatient ? getPatientById(selectedPatient) : null

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6 text-white shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Patient Management</h1>
        <p className="text-sm sm:text-base text-indigo-100">Review patient tests, analyze results, and provide clinical assessments</p>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* Patient List */}
        <Card className="border-2 border-indigo-200 bg-white/90 shadow-lg">
          <SectionTitle
            title="Patient Queue"
            description="Select a patient to view detailed analysis"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-indigo-600">
            <Pill tone="success">Live data</Pill>
            <span className="text-slate-500">{sortedPatients.length} {sortedPatients.length === 1 ? 'patient' : 'patients'}</span>
          </div>
          <div className="mt-4 space-y-3 max-h-[400px] sm:max-h-[600px] overflow-y-auto">
            {sortedPatients.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 p-8 text-center">
                <p className="text-sm text-indigo-600">No patients yet</p>
                <p className="text-xs text-indigo-400 mt-1">Patients will appear here when they sign up</p>
              </div>
            ) : (
              sortedPatients.map((patient, index) => {
                const isNew = index < 3 && !patient.testHistory?.length
                return (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient.id)}
                  className={`rounded-xl border-2 p-4 shadow-sm transition-all cursor-pointer transform hover:scale-[1.02] animate-slide-up ${
                    selectedPatient === patient.id
                      ? 'border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-md ring-2 ring-indigo-200'
                      : 'border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 hover:border-indigo-300 hover:shadow-md'
                  } ${isNew ? 'ring-2 ring-emerald-200 border-emerald-300' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-indigo-900">{patient.name}</p>
                      {isNew && (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 animate-pulse-slow">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-indigo-600 mt-1">ID: ND-{patient.id}</p>
                      {patient.age && (
                        <p className="text-xs text-slate-500 mt-1">Age: {patient.age}</p>
                      )}
                      {patient.tremorScore !== null ? (
                        <div className="mt-2">
                          <p className="text-sm font-semibold text-indigo-900">Tremor: {patient.tremorScore}/100</p>
                          <p className="text-xs text-indigo-600 mt-1">{patient.status}</p>
                        </div>
                      ) : (
                        <Badge tone="slate" className="mt-2">Awaiting test</Badge>
                      )}
                    </div>
                    <div className="text-right">
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
                        <span className="text-xs text-indigo-400">—</span>
                      )}
                      <p className="text-xs text-indigo-500 mt-2">{formatLastActivity(patient.createdAt, patient.lastActivity)}</p>
                    </div>
                  </div>
                </div>
                )
              })
            )}
          </div>
        </Card>

        {/* Patient Details */}
        <Card className="border-2 border-purple-200 bg-white/90 shadow-lg">
          <SectionTitle
            title={selectedPatientData ? `${selectedPatientData.name} - Analysis` : 'Select a Patient'}
            description={selectedPatientData ? 'Review spiral test results and provide clinical notes' : 'Choose a patient from the list to view details'}
          />
          {selectedPatientData ? (
            <div className="mt-4 space-y-3 sm:space-y-4">
              <div className="rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-3 sm:p-4">
                <p className="text-xs font-semibold text-indigo-900 mb-3">Patient Information</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
                  <div>
                    <p className="text-indigo-600">Patient ID</p>
                    <p className="font-semibold text-indigo-900">ND-{selectedPatientData.id}</p>
                  </div>
                  {selectedPatientData.age && (
                    <div>
                      <p className="text-indigo-600">Age</p>
                      <p className="font-semibold text-indigo-900">{selectedPatientData.age} years</p>
                    </div>
                  )}
                  {selectedPatientData.email && (
                    <div className="col-span-2">
                      <p className="text-indigo-600">Email</p>
                      <p className="font-semibold text-indigo-900">{selectedPatientData.email}</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedPatientData.tremorScore !== null && selectedPatientData.testHistory && selectedPatientData.testHistory.length > 0 ? (
                <>
                  <div className="rounded-xl border-2 border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 p-4 sm:p-6 text-center">
                    <div className="mx-auto mb-3 h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-indigo-300 bg-white shadow-inner animate-pulse" />
                    <p className="text-xs font-semibold text-indigo-900">Spiral Drawing Analysis</p>
                    <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-white p-2 sm:p-3">
                      <div className="transform transition-transform hover:scale-105">
                        <p className="text-xs text-indigo-600">Tremor</p>
                        <p className="mt-1 text-lg font-bold text-indigo-900">{selectedPatientData.tremorScore}/100</p>
                      </div>
                      <div className="transform transition-transform hover:scale-105">
                        <p className="text-xs text-indigo-600">Smooth</p>
                        <p className="mt-1 text-lg font-bold text-purple-600">{selectedPatientData.testHistory[0]?.smoothness || 58}%</p>
                      </div>
                      <div className="transform transition-transform hover:scale-105">
                        <p className="text-xs text-indigo-600">Symmetry</p>
                        <p className="mt-1 text-lg font-bold text-pink-600">{selectedPatientData.testHistory[0]?.symmetry || 72}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 p-4 border border-indigo-200">
                      <p className="mb-2 text-sm font-semibold text-indigo-900">AI Analysis</p>
                      <p className="text-xs text-indigo-800">
                        Tremor: {selectedPatientData.tremorScore}/100 ({selectedPatientData.parkinsonIndicator === 'high' ? 'Moderate-High' : selectedPatientData.parkinsonIndicator === 'moderate' ? 'Moderate' : 'Low'})<br />
                        Pattern: Irregular oscillations detected<br />
                        Recommendation: Clinical evaluation recommended
                      </p>
                    </div>
                    <div className="rounded-xl bg-amber-50 p-4 border border-amber-200">
                      <p className="mb-2 text-sm font-semibold text-amber-900">Clinical Indicators</p>
                      <ul className="text-xs text-amber-800 space-y-1">
                        <li>• Resting tremor detected</li>
                        <li>• Reduced smoothness</li>
                        <li>• Asymmetric formation</li>
                      </ul>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-indigo-900 mb-2">Clinical Notes</label>
                      <textarea
                        rows={4}
                        placeholder="Add clinical notes, recommendations, and treatment plans..."
                        className="w-full resize-none rounded-xl border-2 border-indigo-200 bg-white px-4 py-3 text-sm text-indigo-900 outline-none placeholder:text-indigo-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                      />
                    </div>
                    <button className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                      Save Clinical Notes
                    </button>
                  </div>
                </>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 text-center">
                  <p className="text-sm text-indigo-600">No test results available</p>
                  <p className="text-xs text-indigo-400 mt-2">Patient has not completed a spiral test yet</p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 p-12 text-center">
              <p className="text-sm text-indigo-600">Select a patient from the list to view details</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

