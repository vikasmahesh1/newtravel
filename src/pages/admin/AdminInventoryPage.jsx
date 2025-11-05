import { useMemo, useState } from 'react'
import hotels from '../../data/hotels.js'
import holidays from '../../data/holidays.js'

const initialHotelForm = {
  name: '',
  location: '',
  market: 'Domestic',
  pricePerNight: '',
  amenities: '',
  image: '',
}

const initialHolidayForm = {
  name: '',
  destination: '',
  market: 'Domestic',
  duration: '',
  pricePerPerson: '',
  highlights: '',
  gallery: '',
}

export default function AdminInventoryPage() {
  const [hotelForm, setHotelForm] = useState(initialHotelForm)
  const [holidayForm, setHolidayForm] = useState(initialHolidayForm)
  const [submittedMessage, setSubmittedMessage] = useState(null)

  const topHotels = useMemo(() => hotels.slice(0, 6), [])
  const topHolidays = useMemo(() => holidays.slice(0, 6), [])

  const handleHotelSubmit = (event) => {
    event.preventDefault()
    setSubmittedMessage('Hotel entry prepared. Sync this payload with your backend to persist the inventory change.')
    setHotelForm(initialHotelForm)
  }

  const handleHolidaySubmit = (event) => {
    event.preventDefault()
    setSubmittedMessage('Holiday package ready to publish. Forward the JSON contract to your CMS or API service.')
    setHolidayForm(initialHolidayForm)
  }

  return (
    <div className="space-y-10">
      <section className="card space-y-6">
        <header>
          <h2 className="text-lg font-semibold text-slate-900">Add or update hotel inventory</h2>
          <p className="text-sm text-slate-500">
            Structure follows <code className="rounded bg-slate-100 px-2 py-1">src/data/hotels.js</code>. Paste image URLs hosted on your CDN.
          </p>
        </header>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleHotelSubmit}>
          <label className="space-y-2 text-sm font-semibold text-slate-600">
            Name
            <input
              className="input"
              value={hotelForm.name}
              onChange={(event) => setHotelForm((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-600">
            Location
            <input
              className="input"
              value={hotelForm.location}
              onChange={(event) => setHotelForm((prev) => ({ ...prev, location: event.target.value }))}
              required
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-600">
            Market
            <select
              className="input"
              value={hotelForm.market}
              onChange={(event) => setHotelForm((prev) => ({ ...prev, market: event.target.value }))}
            >
              <option>Domestic</option>
              <option>International</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-600">
            Price per night (₹)
            <input
              type="number"
              className="input"
              value={hotelForm.pricePerNight}
              onChange={(event) => setHotelForm((prev) => ({ ...prev, pricePerNight: event.target.value }))}
              required
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-600 md:col-span-2">
            Amenities (comma separated)
            <input
              className="input"
              value={hotelForm.amenities}
              onChange={(event) => setHotelForm((prev) => ({ ...prev, amenities: event.target.value }))}
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-600 md:col-span-2">
            Hero image URL
            <input
              className="input"
              value={hotelForm.image}
              onChange={(event) => setHotelForm((prev) => ({ ...prev, image: event.target.value }))}
            />
          </label>
          <div className="md:col-span-2">
            <button className="btn-primary" type="submit">
              Generate hotel payload
            </button>
          </div>
        </form>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Sample hotels live</h3>
          <ul className="mt-3 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
            {topHotels.map((hotel) => (
              <li key={hotel.id} className="rounded-3xl bg-muted px-4 py-3">
                <p className="font-semibold text-slate-900">{hotel.name}</p>
                <p>{hotel.location}</p>
                <p className="text-xs text-slate-500">Market: {hotel.market} · ₹{hotel.pricePerNight}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="card space-y-6">
        <header>
          <h2 className="text-lg font-semibold text-slate-900">Create curated holiday packages</h2>
          <p className="text-sm text-slate-500">
            Mirror the <code className="rounded bg-slate-100 px-2 py-1">src/data/holidays.js</code> schema for seamless integration with the frontend.
          </p>
        </header>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleHolidaySubmit}>
          <label className="space-y-2 text-sm font-semibold text-slate-600">
            Package name
            <input
              className="input"
              value={holidayForm.name}
              onChange={(event) => setHolidayForm((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-600">
            Destination
            <input
              className="input"
              value={holidayForm.destination}
              onChange={(event) => setHolidayForm((prev) => ({ ...prev, destination: event.target.value }))}
              required
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-600">
            Market
            <select
              className="input"
              value={holidayForm.market}
              onChange={(event) => setHolidayForm((prev) => ({ ...prev, market: event.target.value }))}
            >
              <option>Domestic</option>
              <option>International</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-600">
            Duration (e.g. 5 nights / 6 days)
            <input
              className="input"
              value={holidayForm.duration}
              onChange={(event) => setHolidayForm((prev) => ({ ...prev, duration: event.target.value }))}
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-600">
            Price per person (₹)
            <input
              type="number"
              className="input"
              value={holidayForm.pricePerPerson}
              onChange={(event) => setHolidayForm((prev) => ({ ...prev, pricePerPerson: event.target.value }))}
              required
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-600 md:col-span-2">
            Highlights (comma separated)
            <input
              className="input"
              value={holidayForm.highlights}
              onChange={(event) => setHolidayForm((prev) => ({ ...prev, highlights: event.target.value }))}
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-600 md:col-span-2">
            Gallery URLs (pipe separated)
            <input
              className="input"
              value={holidayForm.gallery}
              onChange={(event) => setHolidayForm((prev) => ({ ...prev, gallery: event.target.value }))}
            />
          </label>
          <div className="md:col-span-2">
            <button className="btn-primary" type="submit">
              Generate holiday payload
            </button>
          </div>
        </form>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Sample packages live</h3>
          <ul className="mt-3 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
            {topHolidays.map((holiday) => (
              <li key={holiday.id} className="rounded-3xl bg-muted px-4 py-3">
                <p className="font-semibold text-slate-900">{holiday.name}</p>
                <p>{holiday.destination}</p>
                <p className="text-xs text-slate-500">Market: {holiday.market} · ₹{holiday.pricePerPerson}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {submittedMessage && (
        <div className="rounded-3xl bg-primary/10 px-4 py-3 text-sm text-primary">{submittedMessage}</div>
      )}
    </div>
  )
}
