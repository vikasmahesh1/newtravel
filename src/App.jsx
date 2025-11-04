import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/home/Home'
import FlightsSearchPage from './pages/flights/FlightsSearchPage'
import FlightDetailsPage from './pages/flights/FlightDetailsPage'
import HotelsSearchPage from './pages/hotels/HotelsSearchPage'
import HotelDetailsPage from './pages/hotels/HotelDetailsPage'
import BusesSearchPage from './pages/buses/BusesSearchPage'
import BusDetailsPage from './pages/buses/BusDetailsPage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import ProfileDashboardPage from './pages/profile/ProfileDashboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="flights" element={<FlightsSearchPage />} />
          <Route path="flights/:flightId" element={<FlightDetailsPage />} />
          <Route path="hotels" element={<HotelsSearchPage />} />
          <Route path="hotels/:hotelId" element={<HotelDetailsPage />} />
          <Route path="buses" element={<BusesSearchPage />} />
          <Route path="buses/:busId" element={<BusDetailsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="profile" element={<ProfileDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
