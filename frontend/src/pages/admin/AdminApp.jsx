import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminLayout from './AdminLayout'
import AdminDashboard from './AdminDashboard'
import AdminInventoryPage from './AdminInventoryPage'
import AdminBookingsPage from './AdminBookingsPage'
import AdminPaymentsPage from './AdminPaymentsPage'
import AdminUsersPage from './AdminUsersPage'
import AdminLoginPage from './AdminLoginPage'
import { selectAdminProfile } from '../../store'

function AdminGuard({ previewMode, loginPath }) {
  const profile = useSelector(selectAdminProfile)
  if (!profile) {
    return <Navigate to={loginPath} replace />
  }
  return <AdminLayout previewMode={previewMode} />
}

export default function AdminApp({ previewMode = false }) {
  const profile = useSelector(selectAdminProfile)
  const loginPath = previewMode ? '/admin/login' : '/login'
  const rootPath = previewMode ? '/admin' : '/'
  return (
    <Routes>
      <Route
        path="/login"
        element={profile ? <Navigate to={rootPath} replace /> : <AdminLoginPage previewMode={previewMode} />}
      />
      <Route element={<AdminGuard previewMode={previewMode} loginPath={loginPath} />}>
        <Route index element={<AdminDashboard />} />
        <Route path="inventory" element={<AdminInventoryPage />} />
        <Route path="bookings" element={<AdminBookingsPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
      <Route path="*" element={<Navigate to={profile ? rootPath : loginPath} replace />} />
    </Routes>
  )
}
