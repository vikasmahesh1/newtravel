import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/home/Home'
import FlightsSearchPage from './pages/flights/FlightsSearchPage'
import FlightDetailsPage from './pages/flights/FlightDetailsPage'
import HotelsSearchPage from './pages/hotels/HotelsSearchPage'
import HotelDetailsPage from './pages/hotels/HotelDetailsPage'
import BusesSearchPage from './pages/buses/BusesSearchPage'
import BusDetailsPage from './pages/buses/BusDetailsPage'
import HolidayPackagesSearchPage from './pages/holidays/HolidayPackagesSearchPage'
import HolidayPackageDetailsPage from './pages/holidays/HolidayPackageDetailsPage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import ProfileDashboardPage from './pages/profile/ProfileDashboardPage'
import AboutPage from './pages/company/AboutPage'
import ContactPage from './pages/company/ContactPage'
import CancellationPolicyPage from './pages/company/CancellationPolicyPage'
import PaymentGatewayPage from './pages/payments/PaymentGatewayPage'
import AdminApp from './pages/admin/AdminApp'

export default function App() {
  const isBrowser = typeof window !== 'undefined'
  const hostname = isBrowser ? window.location.hostname : ''
  const pathname = isBrowser ? window.location.pathname : ''
  const isAdminHost = hostname.startsWith('admin.') || hostname === 'admin.vyugo.com'

  if (isAdminHost) {
    return (
      <BrowserRouter>
        <AdminApp />
      </BrowserRouter>
    )
  }

  const previewMode = pathname.startsWith('/admin')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp previewMode={previewMode} />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="flights" element={<FlightsSearchPage />} />
          <Route path="flights/:flightId" element={<FlightDetailsPage />} />
          <Route path="hotels" element={<HotelsSearchPage />} />
          <Route path="hotels/:hotelId" element={<HotelDetailsPage />} />
          <Route path="buses" element={<BusesSearchPage />} />
          <Route path="buses/:busId" element={<BusDetailsPage />} />
          <Route path="holidays" element={<HolidayPackagesSearchPage />} />
          <Route path="holidays/:holidayId" element={<HolidayPackageDetailsPage />} />
          <Route path="payments/checkout" element={<PaymentGatewayPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="profile" element={<ProfileDashboardPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="cancellation-policy" element={<CancellationPolicyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
