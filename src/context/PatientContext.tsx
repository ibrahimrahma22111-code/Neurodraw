import { createContext, useContext, useState, ReactNode } from 'react'

export interface Patient {
  id: string
  name: string
  email: string
  status: string
  lastActivity: string
  tremorScore: number | null
  parkinsonIndicator: 'low' | 'moderate' | 'high' | null
  age?: number
  createdAt: string
  testHistory?: Array<{
    tremorScore: number
    smoothness: number
    symmetry: number
    speed: number
    parkinsonIndicator: 'low' | 'moderate' | 'high'
    date: string
  }>
}

interface PatientContextValue {
  patients: Patient[]
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'status' | 'lastActivity' | 'tremorScore' | 'parkinsonIndicator'>) => void
  updatePatientTest: (patientId: string, testResult: {
    tremorScore: number
    smoothness: number
    symmetry: number
    speed: number
    parkinsonIndicator: 'low' | 'moderate' | 'high'
  }) => void
  getPatientById: (patientId: string) => Patient | undefined
}

const PatientContext = createContext<PatientContextValue | undefined>(undefined)

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([])

  function addPatient(patientData: Omit<Patient, 'id' | 'createdAt' | 'status' | 'lastActivity' | 'tremorScore' | 'parkinsonIndicator'>) {
    const newPatient: Patient = {
      ...patientData,
      id: `p-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      status: 'Awaiting test',
      lastActivity: 'Just now',
      tremorScore: null,
      parkinsonIndicator: null,
      testHistory: [],
    }
    setPatients((prev) => [newPatient, ...prev])
  }

  function updatePatientTest(
    patientId: string,
    testResult: {
      tremorScore: number
      smoothness: number
      symmetry: number
      speed: number
      parkinsonIndicator: 'low' | 'moderate' | 'high'
    }
  ) {
    setPatients((prev) =>
      prev.map((patient) => {
        if (patient.id === patientId) {
          const testEntry = {
            ...testResult,
            date: new Date().toLocaleDateString(),
          }
          const now = new Date()
          return {
            ...patient,
            tremorScore: testResult.tremorScore,
            parkinsonIndicator: testResult.parkinsonIndicator,
            status: `New spiral test completed`,
            lastActivity: 'Just now',
            createdAt: patient.createdAt, // Keep original creation time
            testHistory: [testEntry, ...(patient.testHistory || [])],
          }
        }
        return patient
      })
    )
  }

  function getPatientById(patientId: string) {
    return patients.find((p) => p.id === patientId)
  }

  return (
    <PatientContext.Provider
      value={{
        patients,
        addPatient,
        updatePatientTest,
        getPatientById,
      }}
    >
      {children}
    </PatientContext.Provider>
  )
}

export function usePatients() {
  const ctx = useContext(PatientContext)
  if (!ctx) {
    throw new Error('usePatients must be used within a PatientProvider')
  }
  return ctx
}

