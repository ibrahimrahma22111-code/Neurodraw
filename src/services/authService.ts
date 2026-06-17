import { apiClient } from './apiClient';
import type { User, UserRole } from '../types';

interface LoginResponse {
    user: User;
    token: string;
}

// Helper to manage local storage
const storage = {
    getToken: () => localStorage.getItem('auth_token'),
    setToken: (token: string) => localStorage.setItem('auth_token', token),
    removeToken: () => localStorage.removeItem('auth_token'),
    getUser: (): User | null => {
        const u = localStorage.getItem('auth_user');
        return u ? JSON.parse(u) : null;
    },
    setUser: (user: User) => localStorage.setItem('auth_user', JSON.stringify(user)),
    removeUser: () => localStorage.removeItem('auth_user'),
    clear: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
    }
};

export const authService = {
    // Login
    async login(payload: { email: string; password: string; role: UserRole }): Promise<User> {
        // Check if we should use valid API or mock
        const useRealApi = import.meta.env.VITE_USE_REAL_AUTH_API === 'true';

        if (useRealApi) {
            const response = await apiClient.post<LoginResponse>('/auth/login', payload);
            storage.setToken(response.token);
            storage.setUser(response.user);
            return response.user;
        } else {
            // Mock login
            await new Promise(resolve => setTimeout(resolve, 800));
            const mockUser: User = {
                id: 'mock-user-id',
                name: payload.role === 'patient' ? 'Demo Patient' : 'Demo Doctor',
                email: payload.email,
                role: payload.role,
            };

            // We simulate a token
            storage.setToken('mock-jwt-token');
            storage.setUser(mockUser);
            return mockUser;
        }
    },

    // Signup
    async signup(payload: { name: string; email: string; password: string; role: UserRole }): Promise<User> {
        const useRealApi = import.meta.env.VITE_USE_REAL_AUTH_API === 'true';

        if (useRealApi) {
            const response = await apiClient.post<LoginResponse>('/auth/signup', payload);
            storage.setToken(response.token);
            storage.setUser(response.user);
            return response.user;
        } else {
            // Mock signup
            await new Promise(resolve => setTimeout(resolve, 800));
            const mockUser: User = {
                id: 'mock-user-id-' + Date.now(),
                name: payload.name,
                email: payload.email,
                role: payload.role,
            };

            storage.setToken('mock-jwt-token');
            storage.setUser(mockUser);
            return mockUser;
        }
    },

    // Logout
    async logout(): Promise<void> {
        // Optionally call API to invalidate session
        const useRealApi = import.meta.env.VITE_USE_REAL_AUTH_API === 'true';
        if (useRealApi) {
            try {
                await apiClient.post('/auth/logout', {});
            } catch (err) {
                console.warn('Logout API call failed, clearing local state anyway', err);
            }
        }
        storage.clear();
    },

    // Check if we have a valid session on app start
    getStoredUser(): User | null {
        return storage.getUser();
    },

    getToken(): string | null {
        return storage.getToken();
    }
};
