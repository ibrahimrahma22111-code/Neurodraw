import { apiClient } from './apiClient';

export interface HistoryItem {
    id: string;
    date: string;
    type: string;
    result: string;
    notes?: string;
    analysis?: {
        tremorScore: number;
        smoothness: number;
        symmetry: number;
        speed: number;
        parkinsonIndicator: 'low' | 'moderate' | 'high';
    };
}

export const historyService = {
    getPatientHistory: async (): Promise<HistoryItem[]> => {
        const useRealApi = import.meta.env.VITE_USE_REAL_HISTORY_API === 'true';

        if (useRealApi) {
            return apiClient.get<HistoryItem[]>('/patient/history');
        }

        // Mock History
        return [
            {
                id: 'h1',
                date: '2024-03-15',
                type: 'Spiral Test',
                result: 'Low Tremor',
                notes: 'Steady usage of pen.',
            },
            {
                id: 'h2',
                date: '2024-03-10',
                type: 'Spiral Test',
                result: 'Moderate Tremor',
                notes: 'Slight deviation in outer loops.',
            }
        ];
    }
};
