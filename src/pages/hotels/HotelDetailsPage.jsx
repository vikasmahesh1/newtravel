import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { mockApi } from '../../services/mockApi'

export default function HotelDetailsPage() {
  const { hotelId } = useParams()
  const [hotel, setHotel] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    async function loadHotel() {
      try {
        const data = await mockApi.getHotelById(hotelId)
        setHotel(data)
        setStatus('succeeded')
      } catch (error) {
        setStatus('failed')
      }
    }
    loadHotel()
  }, [hotelId])

  if (status === 'loading') {
    return <p className="px-6 py-12 text-sm text-slate-500">Loading hotel…</p>
  }

  if (!hotel) {
    return <p className="px-6 py-12 text-sm text-red-500">Hotel not found.</p>
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="card space-y-6">
        <div className="space-y-2">
          <span className="badge">{hotel.location}</span>
          <h1 className="text-3xl font-semibold text-slate-900">{hotel.name}</h1>
          <p className="text-sm text-slate-500">⭐ {hotel.rating} · {hotel.amenities.join(', ')}</p>
        </div>
        <div className="rounded-3xl bg-muted p-6 text-sm text-slate-600">
          {hotel.description}
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Member inclusions</h2>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li>• Flexible check-in and late checkout (on availability)</li>
              <li>• Dedicated concierge chat</li>
              <li>• Daily breakfast credits</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-primary/10 p-6 text-right text-primary">
            <p className="text-2xl font-semibold text-primary">${hotel.pricePerNight}</p>
            <p className="text-xs text-primary/70">per night · taxes extra</p>
            <button className="btn-primary mt-4 w-full md:w-auto">Reserve stay</button>
          </div>
        </div>
      </div>
    </div>
  )
}
