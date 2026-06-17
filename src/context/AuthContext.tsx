import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { User, UserRole } from '../types'
import { authService } from '../services/authService'

interface AuthContextValue {
  user: User | null
  login: (payload: { email: string; password: string; role: UserRole }) => Promise<void>
  signup: (payload: {
    name: string
    email: string
    password: string
    role: UserRole
  }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize with stored user if available
  const [user, setUser] = useState<User | null>(authService.getStoredUser())

  async function login(payload: { email: string; password: string; role: UserRole }) {
    const loggedInUser = await authService.login(payload)
    setUser(loggedInUser)
  }

  async function signup(payload: {
    name: string
    email: string
    password: string
    role: UserRole
  }) {
    const signedUpUser = await authService.signup(payload)
    setUser(signedUpUser)
  }

  function logout() {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}


