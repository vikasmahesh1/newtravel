const payouts = [
  { id: 'INV-8801', partner: 'Azure Bay Resort', type: 'Hotel', status: 'Processing', amount: '₹2,45,000', due: '18 Jun 2024' },
  { id: 'INV-8802', partner: 'VyuGo Air', type: 'Flight', status: 'Settled', amount: '₹5,60,400', due: '12 Jun 2024' },
  { id: 'INV-8803', partner: 'Royal Rajasthan Guides', type: 'Holiday', status: 'Awaiting invoice', amount: '₹1,80,000', due: '22 Jun 2024' },
  { id: 'INV-8804', partner: 'Global Coach Alliance', type: 'Bus', status: 'Processing', amount: '₹92,300', due: '19 Jun 2024' },
]

const customerPayments = [
  { id: 'PY-7751', name: 'Rahul Sharma', product: 'Coorg Rainforest Retreat', method: 'UPI', status: 'Pending', amount: '₹62,000' },
  { id: 'PY-7752', name: 'Anika Rao', product: 'HYD → SIN Flights', method: 'Card', status: 'Captured', amount: '₹82,450' },
  { id: 'PY-7753', name: 'Maya Patel', product: 'Delhi ⇄ Kathmandu Coach', method: 'Netbanking', status: 'Awaiting docs', amount: '₹18,600' },
]

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-8">
      <section className="card space-y-4">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Partner payouts</h2>
            <p className="text-sm text-slate-500">Review settlements before releasing funds.</p>
          </div>
          <button className="btn-secondary">Download ledger</button>
        </header>
        <ul className="space-y-3 text-sm text-slate-600">
          {payouts.map((payout) => (
            <li key={payout.id} className="rounded-3xl bg-muted px-4 py-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{payout.partner}</p>
                  <p className="text-xs text-slate-500">Ref: {payout.id} · {payout.type}</p>
                </div>
                <div className="text-right text-sm font-semibold text-primary">{payout.amount}</div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{payout.status}</span>
                <span className="rounded-full bg-secondary/10 px-3 py-1 text-secondary">Due {payout.due}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="card space-y-4">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Customer payments</h2>
            <p className="text-sm text-slate-500">Surface pending, captured, and failed collections.</p>
          </div>
          <button className="btn-secondary">Trigger reminders</button>
        </header>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">Reference</th>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Product</th>
                <th className="px-3 py-2">Method</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {customerPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-3 py-3 font-semibold text-slate-900">{payment.id}</td>
                  <td className="px-3 py-3">{payment.name}</td>
                  <td className="px-3 py-3">{payment.product}</td>
                  <td className="px-3 py-3">{payment.method}</td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{payment.status}</span>
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-slate-900">{payment.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
