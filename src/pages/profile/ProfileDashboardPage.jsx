import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserProfile } from '../../store'
import { usePageMetadata } from '../../hooks/usePageMetadata'

const placeholderTrips = [
  {
    id: 'TP-1',
    title: 'Lisbon design week',
    status: 'Price alerts active',
    date: 'June 2024',
  },
  {
    id: 'TP-2',
    title: 'Tokyo culture trail',
    status: 'Saved itinerary',
    date: 'August 2024',
  },
]

export default function ProfileDashboardPage() {
  const profile = useSelector(selectUserProfile)
  const location = useLocation()

  usePageMetadata({
    title: 'Your VyuGo Holidays profile',
    description: 'Access loyalty perks, saved journeys, and booking history inside your VyuGo Holidays dashboard.',
    keywords: 'VyuGo profile, travel loyalty, saved trips',
    canonicalPath: '/profile',
  })

  if (!profile) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="badge">Dashboard</span>
          <h1 className="section-title">Welcome {profile?.name || 'Explorer'}</h1>
          <p className="section-subtitle">Manage saved searches, loyalty rewards, and trip planning tools.</p>
        </div>
        <div className="rounded-3xl bg-primary/10 px-5 py-3 text-sm font-semibold text-primary">{profile.tier}</div>
      </header>
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Upcoming & saved trips</h2>
          <ul className="space-y-3 text-sm text-slate-600">
            {placeholderTrips.map((trip) => (
              <li key={trip.id} className="rounded-2xl bg-muted px-4 py-3">
                <p className="font-semibold text-slate-900">{trip.title}</p>
                <p>{trip.status}</p>
                <p className="text-xs text-slate-500">{trip.date}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Loyalty highlights</h2>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>• Earn triple points on bundled flight + stay bookings.</li>
            <li>• Complimentary lounge passes on premium itineraries.</li>
            <li>• Carbon offset contributions matched by VyuGo Holidays.</li>
          </ul>
          <button className="btn-secondary w-fit">View rewards</button>
        </div>
      </section>
      <section className="mt-10 card space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Activity timeline</h2>
        <ul className="space-y-3 text-sm text-slate-600">
          <li>• Flight alert activated for SFO → HND</li>
          <li>• Added Azure Bay Resort to favorites</li>
          <li>• Bus itinerary saved for Denver ➜ Aspen</li>
        </ul>
      </section>
    </div>
  )
}
