import { apiClient } from './apiClient';
import type { ChatMessage } from '../components/Chat';

// Define the response structure we expect from the API
export interface ChatResponse {
    message: string;
    id: string;
    sender: 'ai';
    timestamp: string;
}

export const chatService = {
    sendMessage: async (message: string): Promise<ChatMessage> => {
        const response = await apiClient.post<ChatResponse>('/chat/message', { message });
        return {
            id: response.id,
            sender: response.sender,
            text: response.message,
            timestamp: response.timestamp,
        };
    },
};
