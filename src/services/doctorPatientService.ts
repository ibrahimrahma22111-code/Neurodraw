import { apiClient } from './apiClient'
import type { HistoryItem } from './historyService'

export interface PatientSummary {
    id: string
    name: string
    email: string
    age?: number
    createdAt: string
    testHistory: HistoryItem[]
    clinicalNotes: string
}

export const doctorPatientService = {
    listPatients: (): Promise<PatientSummary[]> => apiClient.get<PatientSummary[]>('/patient/all'),

    saveClinicalNotes: (patientId: string, notes: string): Promise<void> =>
        apiClient.put(`/patient/${patientId}/notes`, { notes }),
}
