import { Navigate, useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserProfile } from '../../store'
import { usePageMetadata } from '../../hooks/usePageMetadata'

const navItems = [
  { id: 'overview', label: 'Dashboard' },
  { id: 'profile', label: 'Profile' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'payments', label: 'Payments' },
  { id: 'support', label: 'Enquiries & Support' },
]

const sampleBookings = [
  {
    id: 'BK-9012',
    title: 'Hyderabad → Singapore Premium Economy',
    market: 'International',
    status: 'Ticketed',
    travelDate: '18 July 2024',
    type: 'Flight',
    total: '₹82,450',
  },
  {
    id: 'BK-9013',
    title: 'Coorg Rainforest Retreat',
    market: 'Domestic',
    status: 'Balance due',
    travelDate: '09 August 2024',
    type: 'Holiday',
    total: '₹1,24,000',
  },
  {
    id: 'BK-9014',
    title: 'Delhi ⇄ Kathmandu Scenic Coach',
    market: 'International',
    status: 'Pending confirmation',
    travelDate: '27 June 2024',
    type: 'Bus',
    total: '₹18,600',
  },
]

const pendingPayments = [
  { id: 'PY-7751', reference: 'Holiday: Coorg Rainforest Retreat', dueDate: '20 June 2024', amount: '₹62,000', status: 'Awaiting UPI' },
  { id: 'PY-7752', reference: 'Flight upgrade: BLR → DXB', dueDate: '15 July 2024', amount: '₹18,750', status: 'Saved for later' },
]

const supportTickets = [
  { id: 'SR-1201', subject: 'Wheelchair assistance for HYD → SIN', status: 'Confirmed', updated: 'Yesterday' },
  { id: 'SR-1202', subject: 'Visa document checklist for Turkey voyage', status: 'In progress', updated: '2 days ago' },
  { id: 'SR-1203', subject: 'Request GST invoice for Jaipur stay', status: 'Resolved', updated: '4 days ago' },
]

const savedTravellers = [
  { name: 'Anika Rao', passport: 'N8901234', loyalty: 'Vistara Club', dietary: 'Vegetarian' },
  { name: 'Rahul Rao', passport: 'Z5612345', loyalty: 'VyuGo Voyager', dietary: 'No shellfish' },
]

export default function ProfileDashboardPage() {
  const profile = useSelector(selectUserProfile)
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('overview')

  usePageMetadata({
    title: 'Your VyuGo Holidays profile',
    description: 'Access loyalty perks, saved journeys, and booking history inside your VyuGo Holidays dashboard.',
    keywords: 'VyuGo profile, travel loyalty, saved trips',
    canonicalPath: '/profile',
  })

  if (!profile) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  const overviewCards = useMemo(
    () => [
      {
        id: 'upcoming',
        title: 'Upcoming journeys',
        description: `${sampleBookings.filter((booking) => booking.status !== 'Completed').length} active across flights, stays & coaches`,
      },
      {
        id: 'loyalty',
        title: 'Voyager tier',
        description: `${profile.tier} · ${profile.points || '18,400'} reward points ready to redeem`,
      },
      {
        id: 'payments',
        title: 'Pending payments',
        description: `${pendingPayments.length} payment${pendingPayments.length > 1 ? 's' : ''} awaiting confirmation`,
      },
      {
        id: 'support',
        title: 'Support tickets',
        description: `${supportTickets.filter((ticket) => ticket.status !== 'Resolved').length} in progress with concierge team`,
      },
    ],
    [profile.tier]
  )

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <section className="card space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Contact & identity</h2>
              <dl className="grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                <div>
                  <dt className="font-semibold text-slate-900">Full name</dt>
                  <dd>{profile.name}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Email</dt>
                  <dd>{profile.email}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Phone</dt>
                  <dd>{profile.phone || '+91 98765 43210'}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Preferred currency</dt>
                  <dd>INR (₹)</dd>
                </div>
              </dl>
            </section>
            <section className="card space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Saved travellers</h2>
              <ul className="space-y-3 text-sm text-slate-600">
                {savedTravellers.map((traveller) => (
                  <li key={traveller.passport} className="rounded-2xl bg-muted px-4 py-3">
                    <p className="font-semibold text-slate-900">{traveller.name}</p>
                    <p>Passport: {traveller.passport}</p>
                    <p className="text-xs text-slate-500">
                      {traveller.loyalty} · Preferences: {traveller.dietary}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )
      case 'bookings':
        return (
          <section className="card space-y-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Your journeys</h2>
                <p className="text-sm text-slate-500">Track every domestic and international booking in one place.</p>
              </div>
              <button className="btn-secondary w-full md:w-auto">Request itinerary change</button>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              {sampleBookings.map((booking) => (
                <li key={booking.id} className="rounded-3xl bg-muted px-4 py-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{booking.title}</p>
                      <p className="text-xs text-slate-500">Ref: {booking.id} · {booking.market} · {booking.type}</p>
                    </div>
                    <div className="text-right text-sm font-semibold text-primary">{booking.total}</div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{booking.status}</span>
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-secondary">Travel: {booking.travelDate}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )
      case 'payments':
        return (
          <section className="card space-y-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Payments & invoices</h2>
                <p className="text-sm text-slate-500">Secure outstanding balances or download receipts.</p>
              </div>
              <button className="btn-primary w-full md:w-auto">Pay all pending</button>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              {pendingPayments.map((payment) => (
                <li key={payment.id} className="rounded-3xl bg-white px-4 py-4 shadow-sm shadow-secondary/10">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{payment.reference}</p>
                      <p className="text-xs text-slate-500">Due {payment.dueDate}</p>
                    </div>
                    <div className="text-right text-sm font-semibold text-primary">{payment.amount}</div>
                  </div>
                  <p className="mt-2 text-xs text-secondary">Status: {payment.status}</p>
                </li>
              ))}
            </ul>
            <button className="btn-secondary w-full md:w-auto">View payment history</button>
          </section>
        )
      case 'support':
        return (
          <section className="card space-y-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Concierge & enquiries</h2>
                <p className="text-sm text-slate-500">Get help with visas, special assistance, or tailor-made ideas.</p>
              </div>
              <button className="btn-primary w-full md:w-auto">Raise a new request</button>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              {supportTickets.map((ticket) => (
                <li key={ticket.id} className="rounded-3xl bg-muted px-4 py-4">
                  <p className="font-semibold text-slate-900">{ticket.subject}</p>
                  <p className="text-xs text-slate-500">Ref: {ticket.id} · Updated {ticket.updated}</p>
                  <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {ticket.status}
                  </span>
                </li>
              ))}
            </ul>
            <div className="rounded-3xl bg-secondary/10 px-4 py-3 text-sm text-secondary">
              Call +91 80999 00011 or WhatsApp our concierge desk for real-time itinerary changes.
            </div>
          </section>
        )
      case 'overview':
      default:
        return (
          <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-2">
              {overviewCards.map((card) => (
                <article key={card.id} className="card space-y-2">
                  <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
                  <p className="text-sm text-slate-600">{card.description}</p>
                </article>
              ))}
            </section>
            <section className="card space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Recent activity</h2>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• Added Maldives lagoon villa ideas to favourites</li>
                <li>• Shared Hyderabad ⇄ Singapore flight quotes with family</li>
                <li>• Requested concierge to arrange wheelchair assistance</li>
              </ul>
            </section>
          </div>
        )
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="badge">Welcome back</span>
          <h1 className="section-title">{profile?.name || 'Explorer'}, your journeys await</h1>
          <p className="section-subtitle">
            Manage bookings, payments, and concierge conversations across domestic and international adventures.
          </p>
        </div>
        <div className="rounded-3xl bg-primary/10 px-5 py-3 text-sm font-semibold text-primary">{profile.tier}</div>
      </header>
      <nav className="mt-10 flex flex-wrap gap-2 rounded-full bg-slate-100 p-2 text-sm font-semibold">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            className={`rounded-full px-4 py-2 transition ${
              activeTab === item.id ? 'bg-white text-primary shadow' : 'text-slate-500 hover:text-primary'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-8 space-y-8">{renderActiveSection()}</div>
    </div>
  )
}
