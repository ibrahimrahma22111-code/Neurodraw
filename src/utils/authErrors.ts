import { ApiError, isNetworkError } from '../services/apiClient'

const SERVER_DOWN_MSG = 'Cannot reach the server. Start the backend with: npm run dev:backend'

export function getLoginErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 502 || err.status === 503 || err.status === 504) {
      return err.detail ?? SERVER_DOWN_MSG
    }
    if (err.detail === 'Role mismatch') {
      return 'Role mismatch. Select the same role you used when creating your account.'
    }
    if (err.status === 401) {
      return err.detail ?? 'Invalid email or password.'
    }
    return err.detail ?? err.message
  }

  if (isNetworkError(err)) {
    return SERVER_DOWN_MSG
  }

  return 'Unable to sign in. Please try again.'
}

export function getSignupErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 502 || err.status === 503 || err.status === 504) {
      return err.detail ?? SERVER_DOWN_MSG
    }
    if (err.detail === 'Email already registered') {
      return 'This email is already registered. Try signing in instead.'
    }
    return err.detail ?? err.message
  }

  if (isNetworkError(err)) {
    return SERVER_DOWN_MSG
  }

  return 'Unable to create account. Please try again.'
}
