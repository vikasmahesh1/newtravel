import flights from '../../data/flights.js'
import hotels from '../../data/hotels.js'
import buses from '../../data/buses.js'
import holidays from '../../data/holidays.js'

const metrics = [
  {
    id: 'bookings',
    title: 'Sample bookings sync',
    value: '2,480',
    helper: 'Across flights, hotels, buses & holidays',
    trend: '▲ 6% vs last month',
  },
  {
    id: 'revenue',
    title: 'Projected revenue',
    value: '₹8.6 Cr',
    helper: 'Based on confirmed + pipeline',
    trend: '▲ 12% vs plan',
  },
  {
    id: 'partners',
    title: 'Inventory sources',
    value: `${flights.length + hotels.length + holidays.length + buses.length}`,
    helper: 'Live products available to merchandisers',
    trend: 'New integrations: 8',
  },
  {
    id: 'support',
    title: 'Open concierge tickets',
    value: '37',
    helper: 'Service-level compliance 98%',
    trend: '▼ 4% vs yesterday',
  },
]

const latestActions = [
  { id: 'ORD-9812', label: 'Holiday', summary: 'Goa Culture & Spice Trail', status: 'Confirmed' },
  { id: 'ORD-9813', label: 'Flight', summary: 'BLR → DXB Business Flex', status: 'Ticketed' },
  { id: 'ORD-9814', label: 'Hotel', summary: 'Santorini Cliff Residence', status: 'Awaiting payment' },
  { id: 'ORD-9815', label: 'Bus', summary: 'Delhi ⇄ Kathmandu Luxury Coach', status: 'On hold' },
]

const contentHighlights = [
  { title: 'Holiday packages', count: holidays.length, description: 'Curated itineraries live for merchandising' },
  { title: 'Hotels', count: hotels.length, description: 'Boutique stays with localized imagery' },
  { title: 'Flights', count: flights.length, description: 'Domestic + international departures' },
  { title: 'Buses', count: buses.length, description: 'Intercity and cross-border luxury coaches' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.id} className="card space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{metric.title}</p>
            <p className="text-3xl font-semibold text-slate-900">{metric.value}</p>
            <p className="text-sm text-slate-500">{metric.helper}</p>
            <p className="text-xs font-semibold text-emerald-600">{metric.trend}</p>
          </article>
        ))}
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="card space-y-4">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Latest orders</h2>
              <p className="text-sm text-slate-500">Sync with CRM or download manifest to reconcile.</p>
            </div>
            <button className="btn-secondary">Export CSV</button>
          </header>
          <ul className="space-y-3 text-sm text-slate-600">
            {latestActions.map((action) => (
              <li key={action.id} className="rounded-3xl bg-muted px-4 py-4">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{action.summary}</p>
                    <p className="text-xs text-slate-500">Ref: {action.id} · {action.label}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{action.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </article>
        <article className="card space-y-4">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Content library</h2>
              <p className="text-sm text-slate-500">Datasets powering vyugo.com search experiences.</p>
            </div>
            <button className="btn-secondary">Manage CDN</button>
          </header>
          <ul className="space-y-3 text-sm text-slate-600">
            {contentHighlights.map((item) => (
              <li key={item.title} className="rounded-3xl bg-white px-4 py-4 shadow-sm shadow-secondary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                  <span className="text-lg font-semibold text-primary">{item.count}</span>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  )
}
