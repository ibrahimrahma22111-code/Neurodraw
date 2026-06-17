import { apiClient } from './apiClient';
import type { ChatMessage } from '../components/Chat';

// Define the response structure we expect from the API
interface ChatResponse {
    message: string;
    id: string;
    sender: 'doctor';
    timestamp: string;
}

// Mock responses for Doctor chat
const mockDoctorResponses: string[] = [
    "Thank you for your message. I'll review your information and get back to you shortly.",
    "Could you please elaborate on your symptoms?",
    "Please schedule a follow-up appointment.",
    "Your latest test results look stable.",
];

const mockSendMessage = async (text: string): Promise<ChatResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: `doctor-${Date.now()}`,
                sender: 'doctor',
                message: mockDoctorResponses[Math.floor(Math.random() * mockDoctorResponses.length)],
                timestamp: new Date().toLocaleTimeString(),
            });
        }, 1500);
    });
};

export const doctorChatService = {
    sendMessage: async (message: string): Promise<ChatMessage> => {
        const useRealApi = import.meta.env.VITE_USE_REAL_CHAT_API === 'true';

        if (useRealApi) {
            try {
                const response = await apiClient.post<ChatResponse>('/chat/doctor/message', { message });
                return {
                    id: response.id,
                    sender: response.sender,
                    text: response.message,
                    timestamp: response.timestamp,
                };
            } catch (error) {
                console.error('Failed to send message to doctor:', error);
                throw error;
            }
        } else {
            const response = await mockSendMessage(message);
            return {
                id: response.id,
                sender: response.sender,
                text: response.message,
                timestamp: response.timestamp,
            };
        }
    },

    getHistory: async (): Promise<ChatMessage[]> => {
        const useRealApi = import.meta.env.VITE_USE_REAL_CHAT_API === 'true';
        if (useRealApi) {
            return apiClient.get<ChatMessage[]>('/chat/doctor/history');
        }

        // Mock history
        return [
            {
                id: '1',
                sender: 'doctor',
                text: 'Hello! I\'m here to help you with any questions about your scans, symptoms, or treatment plan. How can I assist you today?',
                timestamp: new Date().toLocaleTimeString(),
            },
        ];
    }
};
