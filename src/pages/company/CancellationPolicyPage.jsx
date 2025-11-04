import { usePageMetadata } from '../../hooks/usePageMetadata'

const policySections = [
  {
    title: 'Flexible booking window',
    body:
      'Most partner airlines, hotels, and bus operators allow complimentary changes within 24 hours of booking confirmation. Beyond that window, partner-specific fees may apply in addition to fare or rate differences.',
  },
  {
    title: 'Flights',
    body:
      'Domestic flights cancelled 7 days before departure incur airline change penalties as per fare class. International itineraries follow carrier rules and may require documentation for visa-linked tickets. Refunds are processed within 7–10 business days once the airline confirms the balance.',
  },
  {
    title: 'Hotels and holiday packages',
    body:
      'Stays and packages cancelled 14 days prior to check-in receive a full refund minus payment gateway charges. Between 13–7 days, 50% of the package value is retained to cover committed services. Within 6 days of check-in, bookings are non-refundable unless covered by our Trip Assurance add-on.',
  },
  {
    title: 'Buses and surface transfers',
    body:
      'Cancellations up to 48 hours before departure receive an 80% refund. Within 24–48 hours, 40% is refunded. Cancellations inside 24 hours are non-refundable. Name changes are not permitted by bus partners.',
  },
  {
    title: 'How to request a cancellation',
    body:
      'Reach out via concierge desk at +91 90145 67890, email support@vyugo.in, or submit a request in your profile dashboard. Share your booking reference, traveler names, and preferred outcome so our team can coordinate with partners swiftly.',
  },
]

export default function CancellationPolicyPage() {
  usePageMetadata({
    title: 'VyuGo Holidays cancellation policy',
    description:
      'Understand VyuGo Holidays cancellation timelines for flights, hotels, buses, and curated packages plus how to request support.',
    keywords: 'VyuGo cancellation policy, travel refund India, booking changes',
    canonicalPath: '/cancellation-policy',
  })

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <header className="space-y-4 text-center">
        <span className="badge bg-secondary/10 text-secondary">Policies</span>
        <h1 className="section-title">Cancellation & Refund Guidelines</h1>
        <p className="section-subtitle mx-auto">
          Transparency is core to the VyuGo experience. Review timelines, partner rules, and support steps before adjusting your
          plans.
        </p>
      </header>

      <section className="mt-12 space-y-8">
        {policySections.map((section) => (
          <article key={section.title} className="card space-y-3 bg-white">
            <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
            <p className="text-sm leading-relaxed text-slate-600">{section.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 grid gap-6 rounded-3xl bg-secondary/10 p-8 text-sm text-slate-600 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Need a faster resolution?</h3>
          <p className="mt-2">
            Our concierge desk is available daily from 9:00 – 21:00 IST to liaise with airlines, hotels, and experience partners on
            your behalf.
          </p>
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-semibold text-slate-900">Phone:</span> +91 90145 67890
          </p>
          <p>
            <span className="font-semibold text-slate-900">Email:</span> support@vyugo.in
          </p>
          <p>
            <span className="font-semibold text-slate-900">Visit us:</span> 1st Floor, Cinema Rd, Opp. Satya Gowri Theatre, Kakinada ·
            Jubilee Hills Lounge, Hyderabad
          </p>
        </div>
      </section>
    </div>
  )
}
