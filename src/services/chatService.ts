import { apiClient } from './apiClient';
import type { ChatMessage } from '../components/Chat';

// Define the response structure we expect from the API
export interface ChatResponse {
    message: string;
    id: string;
    sender: 'ai';
    timestamp: string;
}

// Temporary mock function to simulate API delay and response
// TODO: Remove this when backend is ready
const mockSendMessage = async (text: string): Promise<ChatResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: `ai-${Date.now()}`,
                sender: 'ai',
                message: 'I understand you\'re asking about: "' + text + '". The spiral drawing test works by analyzing hand movements for tremor patterns, smoothness, and symmetry—key indicators of Parkinson\'s disease. However, for specific medical advice, diagnosis, or treatment recommendations, please consult with a qualified neurologist. Would you like me to explain more about how spiral drawing detects Parkinson\'s, or help interpret your test results?',
                timestamp: new Date().toLocaleTimeString(),
            });
        }, 1000);
    });
};

export const chatService = {
    sendMessage: async (message: string): Promise<ChatMessage> => {
        // Check if we should use the real API or mock
        // For now, we'll default to mock unless a specific env var is set to 'true'
        const useRealApi = import.meta.env.VITE_USE_REAL_CHAT_API === 'true';

        if (useRealApi) {
            try {
                const response = await apiClient.post<ChatResponse>('/chat/message', { message });

                // Map API response to UI model if needed
                return {
                    id: response.id,
                    sender: response.sender,
                    text: response.message, // Assuming API returns 'message' but UI needs 'text'
                    timestamp: response.timestamp,
                };
            } catch (error) {
                console.error('Failed to send message:', error);
                throw error;
            }
        } else {
            // Use mock
            const response = await mockSendMessage(message);
            return {
                id: response.id,
                sender: response.sender,
                text: response.message, // properties match in mock
                timestamp: response.timestamp,
            };
        }
    },

    clearHistory: async (): Promise<void> => {
        const useRealApi = import.meta.env.VITE_USE_REAL_CHAT_API === 'true';
        if (useRealApi) {
            await apiClient.delete('/chat/history');
        }
        // For mock, nothing to persist, so nothing to clear
    }
};
