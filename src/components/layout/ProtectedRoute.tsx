import { Navigate, Outlet } from 'react-router-dom'
import type { Role } from '../../types'
import { useAuth } from '../../context/useAuth'
import { homePathFor } from '../../utils/homePath'

interface ProtectedRouteProps {
  role: Role
}

export default function ProtectedRoute({ role }: ProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />
  if (user.role !== role) return <Navigate to={homePathFor(user.role)} replace />

  return <Outlet />
}