import { useMemo, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserProfile } from '../../store'
import { formatINRCurrency } from '../../utils/formatters'
import { usePageMetadata } from '../../hooks/usePageMetadata'

const typeLabels = {
  flight: 'Flight',
  hotel: 'Hotel stay',
  bus: 'Bus journey',
  holiday: 'Holiday package',
}

export default function PaymentGatewayPage() {
  const profile = useSelector(selectUserProfile)
  const location = useLocation()
  const [status, setStatus] = useState('ready')

  const params = useMemo(() => new URLSearchParams(location.search), [location.search])
  const type = params.get('type') || 'booking'
  const referenceId = params.get('id') || 'NA'
  const amount = Number(params.get('amount') || 0)
  const start = params.get('start')
  const travelers = params.get('travelers')

  usePageMetadata({
    title: 'Secure payment | VyuGo Holidays',
    description: 'Complete your VyuGo Holidays booking securely with our trusted payment partners.',
    keywords: 'VyuGo payment, travel booking payment, secure checkout',
    canonicalPath: '/payments/checkout',
  })

  if (!profile) {
    return <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />
  }

  const handlePayment = () => {
    setStatus('processing')
    setTimeout(() => {
      setStatus('confirmed')
    }, 1500)
  }

  const summaryRows = [
    { label: 'Booking type', value: typeLabels[type] || 'Travel booking' },
    { label: 'Reference ID', value: referenceId },
    amount ? { label: 'Amount due', value: formatINRCurrency(amount) } : null,
    start ? { label: 'Travel date', value: start } : null,
    travelers ? { label: 'Travelers', value: travelers } : null,
    { label: 'Lead traveler', value: profile.name },
  ].filter(Boolean)

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="card space-y-6">
        <header className="space-y-2 text-center">
          <span className="badge bg-secondary/10 text-secondary">Secure checkout</span>
          <h1 className="text-3xl font-semibold text-slate-900">Complete your payment</h1>
          <p className="text-sm text-slate-500">
            You are moments away from locking in your curated {typeLabels[type]?.toLowerCase() || 'experience'}.
          </p>
        </header>
        <section className="space-y-3 text-sm text-slate-600">
          {summaryRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
              <span className="font-semibold text-slate-500">{row.label}</span>
              <span className="text-slate-900">{row.value}</span>
            </div>
          ))}
        </section>
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-lg font-semibold text-slate-900">Payment method</h2>
          <div className="grid gap-3 text-sm text-slate-600 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <input type="radio" name="payment-method" defaultChecked />
              <span>UPI / Net banking</span>
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <input type="radio" name="payment-method" />
              <span>Credit / Debit card</span>
            </label>
          </div>
          <p className="text-xs text-slate-500">Transactions are processed via RazorPay sandbox for demo purposes.</p>
          {status === 'confirmed' ? (
            <div className="rounded-2xl bg-green-100 px-4 py-3 text-sm text-green-800">
              Payment confirmed! A confirmation email has been sent to {profile.email}. You can review details in your profile dashboard.
            </div>
          ) : (
            <button
              type="button"
              className="btn-primary w-full md:w-auto"
              onClick={handlePayment}
              disabled={status === 'processing'}
            >
              {status === 'processing' ? 'Processing…' : 'Pay now'}
            </button>
          )}
        </section>
      </div>
    </div>
  )
}
