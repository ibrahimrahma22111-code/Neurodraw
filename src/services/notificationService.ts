import { apiClient } from './apiClient';

export interface Notification {
    id: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
    type: 'info' | 'alert' | 'success';
}

export const notificationService = {
    getNotifications: async (): Promise<Notification[]> => {
        const useRealApi = import.meta.env.VITE_USE_REAL_NOTIFICATIONS_API === 'true';

        if (useRealApi) {
            return apiClient.get<Notification[]>('/notifications');
        }

        // Mock Notifications
        return [
            {
                id: '1',
                title: 'New Test Analysis',
                message: 'Your spiral drawing test from yesterday has been analyzed.',
                date: new Date().toLocaleDateString(),
                read: false,
                type: 'success',
            },
            {
                id: '2',
                title: 'Doctor Message',
                message: 'Dr. Smith sent you a new secure message.',
                date: new Date(Date.now() - 86400000).toLocaleDateString(),
                read: true,
                type: 'info',
            }
        ];
    },

    markAsRead: async (id: string): Promise<void> => {
        const useRealApi = import.meta.env.VITE_USE_REAL_NOTIFICATIONS_API === 'true';
        if (useRealApi) {
            await apiClient.put(`/notifications/${id}/read`, {});
        }
        // For mock, we just pretend it worked
    }
};
