/**
 * Auth context — wraps the app and redirects unauthenticated users to /login.
 * Reads from Zustand authStore (persisted in localStorage).
 */
import { createContext, useContext, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

interface AuthContextValue {
  isAuthenticated: boolean
  userName: string
  userRole: string
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  userName: '',
  userRole: '',
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useAuthStore()

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userName: user?.name ?? '',
      userRole: user?.role ?? '',
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  // Phase 2: skip auth for demo (mock data mode)
  // In Phase 3 with real backend: uncomment the redirect below
  // if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

export const useAuth = () => useContext(AuthContext)
