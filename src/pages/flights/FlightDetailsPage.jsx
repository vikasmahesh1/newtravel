import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { mockApi } from '../../services/mockApi'
import { formatDateTime, formatINRCurrency } from '../../utils/formatters'

export default function FlightDetailsPage() {
  const { flightId } = useParams()
  const [flight, setFlight] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    async function loadFlight() {
      try {
        const data = await mockApi.getFlightById(flightId)
        setFlight(data)
        setStatus('succeeded')
      } catch (error) {
        setStatus('failed')
      }
    }
    loadFlight()
  }, [flightId])

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
        <div className="flex flex-col gap-4 rounded-3xl bg-muted p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Total</h2>
            <p className="text-sm text-slate-500">Includes taxes and carrier-imposed fees.</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold text-slate-900">{formatINRCurrency(flight.price)}</p>
            <p className="text-xs text-slate-500">per traveler</p>
          </div>
          <button className="btn-primary w-full md:w-auto">Continue to checkout</button>
        </div>
      </div>
    </div>
  )
}
