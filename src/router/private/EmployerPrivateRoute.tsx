import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
export const EmployerPrivateRoute = () => {
  const { role } = useAppSelector(state => state.auth)
  return role === 'employer' ? <Outlet /> : <Navigate to="auth/login" replace />
}
