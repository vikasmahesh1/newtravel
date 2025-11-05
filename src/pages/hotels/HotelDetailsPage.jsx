import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { mockApi } from '../../services/mockApi'
import { formatINRCurrency } from '../../utils/formatters'
import { usePageMetadata } from '../../hooks/usePageMetadata'
import { selectUserProfile } from '../../store'
import { ImageCarousel } from '../../components/common/ImageCarousel'

export default function HotelDetailsPage() {
  const { hotelId } = useParams()
  const [hotel, setHotel] = useState(null)
  const [status, setStatus] = useState('loading')
  const profile = useSelector(selectUserProfile)
  const navigate = useNavigate()

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

  usePageMetadata({
    title: hotel ? `${hotel.name} in ${hotel.location} | VyuGo Holidays` : 'Hotel details | VyuGo Holidays',
    description: hotel
      ? `Preview experiences, amenities, and member perks before reserving ${hotel.name} with VyuGo Holidays.`
      : 'Review curated hotels, amenities, and inclusions with VyuGo Holidays.',
    keywords: 'hotel details India, VyuGo hotels, boutique stay booking',
    canonicalPath: hotel ? `/hotels/${hotel.id}` : '/hotels',
  })

  const handleReserve = () => {
    if (!hotel) return
    navigate(`/payments/checkout?type=hotel&id=${hotel.id}&amount=${hotel.pricePerNight}`)
  }

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
          <div className="flex flex-wrap gap-2">
            <span className="badge">{hotel.location}</span>
            <span className="badge bg-primary/10 text-primary">{hotel.market}</span>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">{hotel.name}</h1>
          <p className="text-sm text-slate-500">⭐ {hotel.rating} · {hotel.amenities.join(', ')}</p>
        </div>
        <ImageCarousel images={hotel.images} altPrefix={`${hotel.name} suite preview`} aspectClassName="aspect-[3/2]" />
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
          {profile ? (
            <div className="rounded-3xl bg-primary/10 p-6 text-right text-primary">
              <p className="text-2xl font-semibold text-primary">{formatINRCurrency(hotel.pricePerNight)}</p>
              <p className="text-xs text-primary/70">per night · taxes extra</p>
              <button className="btn-primary mt-4 w-full md:w-auto" onClick={handleReserve}>
                Proceed to payment
              </button>
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-6 text-left text-sm text-slate-600 shadow-card md:text-right">
              <h2 className="text-lg font-semibold text-slate-900">Sign in to view member rates</h2>
              <p className="mt-1">Log in to reveal nightly pricing, perks, and secure your suite.</p>
              <NavLink to="/login" className="btn-primary mt-4 w-full md:w-auto">
                Sign in to continue
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
