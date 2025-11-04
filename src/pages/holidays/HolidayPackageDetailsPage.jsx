import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { mockApi } from '../../services/mockApi'
import { formatINRCurrency } from '../../utils/formatters'

export default function HolidayPackageDetailsPage() {
  const { holidayId } = useParams()
  const [holiday, setHoliday] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    async function loadHoliday() {
      try {
        const data = await mockApi.getHolidayById(holidayId)
        setHoliday(data)
        setStatus('succeeded')
      } catch (error) {
        setStatus('failed')
      }
    }
    loadHoliday()
  }, [holidayId])

  if (status === 'loading') {
    return <p className="px-6 py-12 text-sm text-slate-500">Designing your escape…</p>
  }

  if (!holiday) {
    return <p className="px-6 py-12 text-sm text-red-500">Holiday package not found.</p>
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="card space-y-6">
        <div className="flex flex-col gap-2">
          <span className="badge">{holiday.theme}</span>
          <h1 className="text-3xl font-semibold text-slate-900">{holiday.name}</h1>
          <p className="text-sm text-slate-500">{holiday.destination}</p>
          <p className="text-sm text-slate-500">{holiday.duration} · Designed for {holiday.travelersIncluded} travelers</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Highlights</h2>
          <ul className="mt-3 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
            {holiday.highlights.map((highlight) => (
              <li key={highlight} className="rounded-2xl bg-muted px-4 py-3">
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Experience overview</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{holiday.description}</p>
        </div>
        <div className="flex flex-col gap-4 rounded-3xl bg-muted p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Package investment</h2>
            <p className="text-sm text-slate-500">Includes flights, boutique stays, private guides, and curated experiences.</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold text-slate-900">{formatINRCurrency(holiday.pricePerPerson)}</p>
            <p className="text-xs text-slate-500">per traveler · flexible payment options available</p>
          </div>
          <button className="btn-primary w-full md:w-auto">Speak with a VyuGo curator</button>
        </div>
      </div>
    </div>
  )
}
