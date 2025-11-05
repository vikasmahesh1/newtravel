import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import AdminDashboard from './AdminDashboard'
import AdminInventoryPage from './AdminInventoryPage'
import AdminBookingsPage from './AdminBookingsPage'
import AdminPaymentsPage from './AdminPaymentsPage'
import AdminUsersPage from './AdminUsersPage'

export default function AdminApp({ previewMode = false }) {
  return (
    <Routes>
      <Route element={<AdminLayout previewMode={previewMode} />}>
        <Route index element={<AdminDashboard />} />
        <Route path="inventory" element={<AdminInventoryPage />} />
        <Route path="bookings" element={<AdminBookingsPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  )
}
