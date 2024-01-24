import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
export const UserPrivateRoute = () => {
  const { role } = useAppSelector(state => state.auth)
  return role === 'user' ? <Outlet /> : <Navigate to="auth/login" replace />
}
