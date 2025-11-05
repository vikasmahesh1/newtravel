import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { mockApi } from '../../services/mockApi'
import { formatINRCurrency } from '../../utils/formatters'
import { usePageMetadata } from '../../hooks/usePageMetadata'
import { selectUserProfile } from '../../store'
import { DatePickerField } from '../../components/common/DatePickerField'
import { ImageCarousel } from '../../components/common/ImageCarousel'

export default function HolidayPackageDetailsPage() {
  const { holidayId } = useParams()
  const [holiday, setHoliday] = useState(null)
  const [status, setStatus] = useState('loading')
  const [bookingValues, setBookingValues] = useState({ startDate: '', travelers: '', specialRequests: '' })
  const profile = useSelector(selectUserProfile)
  const navigate = useNavigate()

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

  useEffect(() => {
    if (holiday) {
      setBookingValues((prev) => ({
        ...prev,
        travelers: String(holiday.travelersIncluded ?? prev.travelers ?? ''),
      }))
    }
  }, [holiday])

  usePageMetadata({
    title: holiday ? `${holiday.name} holiday package | VyuGo Holidays` : 'Holiday package | VyuGo Holidays',
    description: holiday
      ? `Discover inclusions, highlights, and pricing for ${holiday.name} curated by VyuGo Holidays before confirming your trip.`
      : 'Review curated holiday packages with VyuGo Holidays.',
    keywords: 'holiday package details, VyuGo holidays, curated tour booking',
    canonicalPath: holiday ? `/holidays/${holiday.id}` : '/holidays',
  })

  const handleBookingSubmit = (event) => {
    event.preventDefault()
    if (!holiday) return
    const travelers = Number(bookingValues.travelers || holiday.travelersIncluded)
    const total = travelers * holiday.pricePerPerson
    navigate(
      `/payments/checkout?type=holiday&id=${holiday.id}&amount=${total}&start=${bookingValues.startDate || ''}&travelers=${travelers}`,
    )
  }

  const totalAmount = holiday
    ? Number(bookingValues.travelers || holiday.travelersIncluded || 1) * holiday.pricePerPerson
    : 0

  const today = new Date().toISOString().slice(0, 10)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setBookingValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (nextDate) => {
    setBookingValues((prev) => ({ ...prev, startDate: nextDate }))
  }

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
          <div className="flex flex-wrap gap-2">
            <span className="badge">{holiday.theme}</span>
            <span className="badge bg-primary/10 text-primary">{holiday.market}</span>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">{holiday.name}</h1>
          <p className="text-sm text-slate-500">{holiday.destination}</p>
          <p className="text-sm text-slate-500">{holiday.duration} · Designed for {holiday.travelersIncluded} travelers</p>
        </div>
        <ImageCarousel images={holiday.gallery} altPrefix={`${holiday.name} experience`} aspectClassName="aspect-[4/3]" />
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
        </div>
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-card">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Ready to book this escape?</h2>
            {profile && (
              <p className="text-sm font-semibold text-primary">
                Estimated total: {formatINRCurrency(totalAmount)}
              </p>
            )}
          </div>
          {!profile && (
            <p className="rounded-3xl bg-primary/5 px-4 py-3 text-sm text-primary">
              Sign in to complete the form and lock in this curated holiday with secure payment.
            </p>
          )}
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <fieldset className={`grid gap-4 md:grid-cols-2 ${profile ? '' : 'pointer-events-none opacity-60'}`} disabled={!profile}>
              <div className="md:col-span-1">
                <DatePickerField
                  id="holiday-start-date"
                  name="startDate"
                  label="Preferred start"
                  value={bookingValues.startDate}
                  min={today}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="holiday-travelers-count">
                  Travelers
                </label>
                <input
                  id="holiday-travelers-count"
                  type="number"
                  name="travelers"
                  min={1}
                  className="input"
                  value={bookingValues.travelers}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="holiday-requests">
                  Special requests
                </label>
                <textarea
                  id="holiday-requests"
                  name="specialRequests"
                  className="input h-24 resize-none"
                  placeholder="Share preferred experiences, celebrations, or dietary needs"
                  value={bookingValues.specialRequests}
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>
            {profile ? (
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-slate-500">
                  You will be redirected to our secure payment partner to confirm your booking.
                </p>
                <button type="submit" className="btn-primary w-full md:w-auto">
                  Proceed to payment
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-slate-500">
                  Create an account or log in to finalise your itinerary and payment.
                </p>
                <NavLink to="/login" className="btn-primary w-full md:w-auto">
                  Sign in to book
                </NavLink>
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  )
}
