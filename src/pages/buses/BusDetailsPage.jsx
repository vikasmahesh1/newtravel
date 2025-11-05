import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { apiClient } from '../../services/apiClient'
import { formatDateTime, formatINRCurrency } from '../../utils/formatters'
import { usePageMetadata } from '../../hooks/usePageMetadata'
import { selectUserProfile } from '../../store'

export default function BusDetailsPage() {
  const { busId } = useParams()
  const [bus, setBus] = useState(null)
  const [status, setStatus] = useState('loading')
  const profile = useSelector(selectUserProfile)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadBus() {
      try {
        const data = await apiClient.getBusById(busId)
        setBus(data)
        setStatus('succeeded')
      } catch (error) {
        setStatus('failed')
      }
    }
    loadBus()
  }, [busId])

  usePageMetadata({
    title: bus ? `${bus.route} luxury bus | VyuGo Holidays` : 'Bus itinerary | VyuGo Holidays',
    description: bus
      ? `Review departure times, amenities, and seating for ${bus.route} operated by ${bus.operator} before reserving with VyuGo Holidays.`
      : 'Explore curated Indian bus itineraries and amenities with VyuGo Holidays.',
    keywords: 'bus itinerary India, VyuGo buses, reserve bus seats',
    canonicalPath: bus ? `/buses/${bus.id}` : '/buses',
  })

  const handleReserve = () => {
    if (!bus) return
    navigate(`/payments/checkout?type=bus&id=${bus.id}&amount=${bus.price}`)
  }

  if (status === 'loading') {
    return <p className="px-6 py-12 text-sm text-slate-500">Loading coach…</p>
  }

  if (!bus) {
    return <p className="px-6 py-12 text-sm text-red-500">Bus not found.</p>
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="card space-y-6">
        <div className="space-y-2">
          <span className="badge">{bus.operator}</span>
          <h1 className="text-3xl font-semibold text-slate-900">{bus.route}</h1>
          <p className="text-sm text-slate-500">
            Depart {formatDateTime(bus.departure)} · Arrive {formatDateTime(bus.arrival)}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Duration</h2>
            <p className="mt-2 text-lg font-semibold text-slate-900">{bus.duration}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Seating</h2>
            <p className="mt-2 text-lg font-semibold text-slate-900">{bus.seating}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Fare</h2>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {profile ? formatINRCurrency(bus.price) : 'Sign in to view'}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Onboard amenities</h2>
          <ul className="mt-2 flex flex-wrap gap-3 text-sm text-slate-600">
            {bus.amenities.map((amenity) => (
              <li key={amenity} className="rounded-full bg-primary/10 px-3 py-1">
                {amenity}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-muted p-6 text-sm text-slate-600">{bus.description}</div>
        {profile ? (
          <button className="btn-primary w-full" onClick={handleReserve}>
            Continue to payment
          </button>
        ) : (
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 text-sm text-slate-600 shadow-card md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Sign in to secure your seats</h2>
              <p>Log in to reveal fares and proceed with payment for this journey.</p>
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
