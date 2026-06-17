import { ApiError, isNetworkError } from '../services/apiClient'

export function getLoginErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.detail === 'Role mismatch') {
      return 'Role mismatch. Select the same role you used when creating your account.'
    }
    if (err.status === 401) {
      return err.detail ?? 'Invalid email or password.'
    }
    return err.detail ?? err.message
  }

  if (isNetworkError(err)) {
    return 'Cannot reach the server. Start the backend with: npm run dev:backend'
  }

  return 'Unable to sign in. Please try again.'
}

export function getSignupErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.detail === 'Email already registered') {
      return 'This email is already registered. Try signing in instead.'
    }
    return err.detail ?? err.message
  }

  if (isNetworkError(err)) {
    return 'Cannot reach the server. Start the backend with: npm run dev:backend'
  }

  return 'Unable to create account. Please try again.'
}
