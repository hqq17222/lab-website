import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface Props {
  children: React.ReactNode
  requireAdmin?: boolean
  requireDataAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin, requireDataAdmin }: Props) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-forest-50 dark:bg-forest-950">
        <div className="w-8 h-8 border-2 border-forest-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  if (requireAdmin && profile?.role !== 'admin') return <Navigate to="/admin" replace />
  if (requireDataAdmin && profile?.role === 'user') return <Navigate to="/admin" replace />

  return <>{children}</>
}
