import { useMemo } from 'react'
import flights from '../../data/flights.js'
import hotels from '../../data/hotels.js'
import buses from '../../data/buses.js'
import holidays from '../../data/holidays.js'

const bookingPipeline = [
  {
    id: 'BKN-4501',
    customer: 'Anika Rao',
    journey: 'Hyderabad → Singapore',
    type: 'Flight',
    market: 'International',
    status: 'Ticketed',
    value: '₹82,450',
  },
  {
    id: 'BKN-4502',
    customer: 'Rahul Sharma',
    journey: 'Coorg Rainforest Retreat',
    type: 'Holiday',
    market: 'Domestic',
    status: 'Awaiting payment',
    value: '₹1,24,000',
  },
  {
    id: 'BKN-4503',
    customer: 'Maya Patel',
    journey: 'Delhi ⇄ Kathmandu Luxury Coach',
    type: 'Bus',
    market: 'International',
    status: 'Pending docs',
    value: '₹18,600',
  },
  {
    id: 'BKN-4504',
    customer: 'Vikram Iyer',
    journey: 'Santorini Cliff Residence',
    type: 'Hotel',
    market: 'International',
    status: 'Confirmed',
    value: '₹96,200',
  },
]

export default function AdminBookingsPage() {
  const flightPreview = useMemo(() => flights.slice(0, 5), [])
  const hotelPreview = useMemo(() => hotels.slice(0, 5), [])
  const busPreview = useMemo(() => buses.slice(0, 5), [])
  const holidayPreview = useMemo(() => holidays.slice(0, 5), [])

  return (
    <div className="space-y-8">
      <section className="card space-y-4">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Live booking pipeline</h2>
            <p className="text-sm text-slate-500">Track fulfilment and hand off to CRM or operations.</p>
          </div>
          <button className="btn-secondary">Sync to CRM</button>
        </header>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">Reference</th>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Journey</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Market</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-right">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {bookingPipeline.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-3 py-3 font-semibold text-slate-900">{booking.id}</td>
                  <td className="px-3 py-3">{booking.customer}</td>
                  <td className="px-3 py-3">{booking.journey}</td>
                  <td className="px-3 py-3">{booking.type}</td>
                  <td className="px-3 py-3">{booking.market}</td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{booking.status}</span>
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-slate-900">{booking.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="card space-y-4">
          <header>
            <h3 className="text-lg font-semibold text-slate-900">Flight sample data</h3>
            <p className="text-sm text-slate-500">Ensure backend contract matches the mock schema for smooth ingestion.</p>
          </header>
          <ul className="space-y-3 text-sm text-slate-600">
            {flightPreview.map((flight) => (
              <li key={flight.id} className="rounded-3xl bg-muted px-4 py-3">
                <p className="font-semibold text-slate-900">
                  {flight.from} → {flight.to}
                </p>
                <p className="text-xs text-slate-500">Market: {flight.market} · Fare class: {flight.fareClass}</p>
              </li>
            ))}
          </ul>
        </article>
        <article className="card space-y-4">
          <header>
            <h3 className="text-lg font-semibold text-slate-900">Hotel sample data</h3>
            <p className="text-sm text-slate-500">Use gallery arrays and amenities lists for parity with UI rendering.</p>
          </header>
          <ul className="space-y-3 text-sm text-slate-600">
            {hotelPreview.map((hotel) => (
              <li key={hotel.id} className="rounded-3xl bg-muted px-4 py-3">
                <p className="font-semibold text-slate-900">{hotel.name}</p>
                <p className="text-xs text-slate-500">{hotel.location} · Market: {hotel.market}</p>
              </li>
            ))}
          </ul>
        </article>
        <article className="card space-y-4">
          <header>
            <h3 className="text-lg font-semibold text-slate-900">Bus sample data</h3>
            <p className="text-sm text-slate-500">Cross-border routes include customs support metadata.</p>
          </header>
          <ul className="space-y-3 text-sm text-slate-600">
            {busPreview.map((bus) => (
              <li key={bus.id} className="rounded-3xl bg-muted px-4 py-3">
                <p className="font-semibold text-slate-900">{bus.route}</p>
                <p className="text-xs text-slate-500">Market: {bus.market} · {bus.seating}</p>
              </li>
            ))}
          </ul>
        </article>
        <article className="card space-y-4">
          <header>
            <h3 className="text-lg font-semibold text-slate-900">Holiday sample data</h3>
            <p className="text-sm text-slate-500">Highlight themes, gallery length, and per-person pricing.</p>
          </header>
          <ul className="space-y-3 text-sm text-slate-600">
            {holidayPreview.map((holiday) => (
              <li key={holiday.id} className="rounded-3xl bg-muted px-4 py-3">
                <p className="font-semibold text-slate-900">{holiday.name}</p>
                <p className="text-xs text-slate-500">{holiday.destination} · Market: {holiday.market}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  )
}
