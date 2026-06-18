const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
}

export class ApiError extends Error {
    status: number;
    detail?: string;

    constructor(message: string, status: number, detail?: string) {
        super(message);
        this.status = status;
        this.detail = detail;
        this.name = 'ApiError';
    }
}

export function isNetworkError(err: unknown): boolean {
    if (err instanceof TypeError) return true;
    // Treat proxy/gateway errors as unreachable-server errors
    if (err instanceof ApiError && (err.status === 0 || err.status === 502 || err.status === 503 || err.status === 504)) return true;
    if (err instanceof Error) {
        const message = err.message.toLowerCase();
        return (
            message.includes('failed to fetch') ||
            message.includes('networkerror') ||
            message.includes('network request failed') ||
            message.includes('load failed') ||
            message.includes('econnreset') ||
            message.includes('econnrefused') ||
            message.includes('fetch failed') ||
            message.includes('unable to connect')
        );
    }
    return false;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const token = localStorage.getItem('auth_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const config: RequestInit = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            let detail: string | undefined;
            try {
                const body = (await response.json()) as { detail?: string | Array<{ msg: string }> };
                if (typeof body.detail === 'string') {
                    detail = body.detail;
                } else if (Array.isArray(body.detail)) {
                    detail = body.detail.map((item) => item.msg).join(', ');
                }
            } catch {
                // Response body is not JSON
            }
            throw new ApiError(detail ?? `API Error: ${response.statusText}`, response.status, detail);
        }

        // Handle empty responses
        if (response.status === 204) {
            return {} as T;
        }

        const data = await response.json();
        return data as T;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        // Network errors or JSON parsing errors
        throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
    }
}

export const apiClient = {
    get: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'GET' }),
    post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
    put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'DELETE' }),
};
