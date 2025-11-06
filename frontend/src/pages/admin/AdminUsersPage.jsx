const customers = [
  { id: 'USR-1001', name: 'Anika Rao', tier: 'Voyager Elite', email: 'anika@vyugo.com', marketFocus: 'International' },
  { id: 'USR-1002', name: 'Rahul Sharma', tier: 'Voyager Plus', email: 'rahul@vyugo.com', marketFocus: 'Domestic' },
  { id: 'USR-1003', name: 'Maya Patel', tier: 'Voyager', email: 'maya@vyugo.com', marketFocus: 'International' },
]

const enquiries = [
  { id: 'SR-1201', subject: 'Wheelchair assistance for HYD → SIN', owner: 'Concierge Desk', status: 'Confirmed' },
  { id: 'SR-1202', subject: 'Visa checklist for Turkey Blue Voyage', owner: 'Docs Team', status: 'In progress' },
  { id: 'SR-1203', subject: 'Corporate billing for Bengaluru offsite', owner: 'Finance', status: 'Awaiting customer' },
]

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <section className="card space-y-4">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Customer roster</h2>
            <p className="text-sm text-slate-500">Export users to your CRM or marketing automation tools.</p>
          </div>
          <button className="btn-secondary">Export users</button>
        </header>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Tier</th>
                <th className="px-3 py-2">Preferred market</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-3 py-3 font-semibold text-slate-900">{customer.id}</td>
                  <td className="px-3 py-3">{customer.name}</td>
                  <td className="px-3 py-3">{customer.email}</td>
                  <td className="px-3 py-3">{customer.tier}</td>
                  <td className="px-3 py-3">{customer.marketFocus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="card space-y-4">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Concierge enquiries</h2>
            <p className="text-sm text-slate-500">Assign owners, prioritise SLAs, and log updates.</p>
          </div>
          <button className="btn-secondary">Assign owner</button>
        </header>
        <ul className="space-y-3 text-sm text-slate-600">
          {enquiries.map((ticket) => (
            <li key={ticket.id} className="rounded-3xl bg-muted px-4 py-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{ticket.subject}</p>
                  <p className="text-xs text-slate-500">Ref: {ticket.id} · Owner: {ticket.owner}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{ticket.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
