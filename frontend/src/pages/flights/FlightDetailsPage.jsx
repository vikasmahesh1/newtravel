import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { apiClient } from '../../services/apiClient'
import { formatDateTime, formatINRCurrency } from '../../utils/formatters'
import { usePageMetadata } from '../../hooks/usePageMetadata'
import { selectUserProfile } from '../../store'

export default function FlightDetailsPage() {
  const { flightId } = useParams()
  const [flight, setFlight] = useState(null)
  const [status, setStatus] = useState('loading')
  const profile = useSelector(selectUserProfile)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadFlight() {
      try {
        const data = await apiClient.getFlightById(flightId)
        setFlight(data)
        setStatus('succeeded')
      } catch (error) {
        setStatus('failed')
      }
    }
    loadFlight()
  }, [flightId])

  usePageMetadata({
    title: flight ? `${flight.from} to ${flight.to} flight | VyuGo Holidays` : 'Flight itinerary | VyuGo Holidays',
    description: flight
      ? `Review cabin, timing, and amenity details for ${flight.from} to ${flight.to} with VyuGo Holidays before booking.`
      : 'Review detailed flight itineraries with VyuGo Holidays before booking.',
    keywords: 'flight details, VyuGo flights, airline booking India',
    canonicalPath: flight ? `/flights/${flight.id}` : '/flights',
  })

  const handleCheckout = () => {
    if (!flight) return
    navigate(`/payments/checkout?type=flight&id=${flight.id}&amount=${flight.price}`)
  }

  if (status === 'loading') {
    return <p className="px-6 py-12 text-sm text-slate-500">Loading itinerary…</p>
  }

  if (!flight) {
    return <p className="px-6 py-12 text-sm text-red-500">Flight not found.</p>
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="card space-y-6">
        <div className="flex flex-col gap-2">
          <span className="badge">{flight.airline}</span>
          <h1 className="text-3xl font-semibold text-slate-900">
            {flight.from} → {flight.to}
          </h1>
          <p className="text-sm text-slate-500">
            Depart {formatDateTime(flight.departure)} · Arrive {formatDateTime(flight.arrival)}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Duration</h2>
            <p className="mt-2 text-lg font-semibold text-slate-900">{flight.duration}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Stops</h2>
            <p className="mt-2 text-lg font-semibold text-slate-900">{flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Cabin</h2>
            <p className="mt-2 text-lg font-semibold text-slate-900">{flight.fareClass}</p>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Amenities</h2>
          <ul className="mt-2 flex flex-wrap gap-3 text-sm text-slate-600">
            {flight.amenities.map((amenity) => (
              <li key={amenity} className="rounded-full bg-primary/10 px-3 py-1">
                {amenity}
              </li>
            ))}
          </ul>
        </div>
        {profile ? (
          <div className="flex flex-col gap-4 rounded-3xl bg-muted p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Total</h2>
              <p className="text-sm text-slate-500">Includes taxes and carrier-imposed fees.</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-slate-900">{formatINRCurrency(flight.price)}</p>
              <p className="text-xs text-slate-500">per traveler</p>
            </div>
            <button className="btn-primary w-full md:w-auto" onClick={handleCheckout}>
              Continue to payment
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 text-sm text-slate-600 shadow-card md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Sign in to unlock booking details</h2>
              <p>Log in to view fares, traveler inclusions, and continue to secure payment.</p>
            </div>
            <NavLink to="/login" className="btn-primary w-full md:w-auto">
              Sign in to continue
            </NavLink>
          </div>
        )}
      </div>
    </div>
  )
}
