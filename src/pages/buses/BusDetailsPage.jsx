import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { mockApi } from '../../services/mockApi'
import { formatDateTime, formatINRCurrency } from '../../utils/formatters'

export default function BusDetailsPage() {
  const { busId } = useParams()
  const [bus, setBus] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    async function loadBus() {
      try {
        const data = await mockApi.getBusById(busId)
        setBus(data)
        setStatus('succeeded')
      } catch (error) {
        setStatus('failed')
      }
    }
    loadBus()
  }, [busId])

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
            <p className="mt-2 text-lg font-semibold text-slate-900">{formatINRCurrency(bus.price)}</p>
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
        <button className="btn-primary w-full">Reserve seats</button>
      </div>
    </div>
  )
}
