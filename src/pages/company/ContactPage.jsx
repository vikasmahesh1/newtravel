const contactChannels = [
  {
    label: 'Concierge desk',
    value: '+91 90145 67890',
    description: 'Available daily 9:00 – 21:00 IST for itinerary planning and emergency assistance.',
  },
  {
    label: 'Experiences email',
    value: 'experiences@vyugo.in',
    description: 'Share your bucket-list ideas and our travel stylists will craft a personalised proposal.',
  },
  {
    label: 'Corporate travel',
    value: 'corporate@vyugo.in',
    description: 'Dedicated desks for business travel, events, and incentive journeys across India and abroad.',
  },
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="space-y-4 text-center">
        <span className="badge bg-secondary/10 text-secondary">Get in touch</span>
        <h1 className="section-title">We are here for every step of your journey</h1>
        <p className="section-subtitle mx-auto">
          Visit us in person, call our concierge desk, or drop a note—our team will respond within one business day.
        </p>
      </header>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="card h-full space-y-4 bg-white">
          <h2 className="text-lg font-semibold text-slate-900">Head office</h2>
          <p className="text-sm text-slate-600">
            1st Floor, Cinema Rd, Opp. Satya Gowri Theatre, Suryanarayana Puram, Kakinada, Andhra Pradesh 533001
          </p>
          <p className="text-sm text-slate-500">Monday – Saturday · 9:00 – 21:00 IST</p>
        </div>
        <div className="card h-full space-y-4 bg-white">
          <h2 className="text-lg font-semibold text-slate-900">Hyderabad branch lounge</h2>
          <p className="text-sm text-slate-600">Suite 402, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033</p>
          <p className="text-sm text-slate-500">Tuesday – Sunday · 10:00 – 20:00 IST</p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-900">Talk to a specialist</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {contactChannels.map((channel) => (
            <article key={channel.label} className="card h-full bg-white">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">{channel.label}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{channel.value}</p>
              <p className="mt-2 text-sm text-slate-600">{channel.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="grid gap-8 md:grid-cols-[1.1fr,1fr] md:items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Drop us a message</h2>
            <p className="text-sm text-slate-600">
              Share your travel dreams, preferred dates, and any special requirements. Our consultants will reply with ideas and
              next steps.
            </p>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <div>
                <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Name
                </label>
                <input id="contact-name" name="name" className="input" placeholder="Your name" required />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </label>
                <input id="contact-email" name="email" type="email" className="input" placeholder="you@example.com" required />
              </div>
              <div>
                <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  How can we help?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  className="input"
                  placeholder="Tell us about your travel plans"
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Send message</button>
            </form>
          </div>
          <div className="card space-y-4 bg-white text-sm text-slate-600">
            <h3 className="text-lg font-semibold text-slate-900">Need quick answers?</h3>
            <p>
              Visit our Cancellation Policy and FAQs to understand timelines, refunds, and documentation. Our help desk can also
              arrange video consultations for complex itineraries.
            </p>
            <p className="text-slate-500">We typically respond within 4 business hours.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
