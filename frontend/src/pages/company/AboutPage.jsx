import heroImage from '../../assets/vyugo-logo.svg'
import { usePageMetadata } from '../../hooks/usePageMetadata'

const milestones = [
  {
    year: '2016',
    title: 'VyuGo Holidays is born',
    description:
      'We opened our Kakinada headquarters with a small team of travel stylists crafting bespoke itineraries for families and honeymooners.',
  },
  {
    year: '2019',
    title: 'Hyderabad branch launches',
    description:
      'Our Hyderabad lounge expanded access to corporate travel desks, visa facilitation, and curated experiences across India and beyond.',
  },
  {
    year: '2023',
    title: 'Full-service travel technology',
    description:
      'We unified flights, hotels, buses, and holiday packages in one digital workspace backed by concierge support and real-time alerts.',
  },
]

const values = [
  {
    title: 'Human-first planning',
    description:
      'Dedicated consultants learn every traveler preference, from dietary needs to dream experiences, before presenting curated options.',
  },
  {
    title: 'Responsible journeys',
    description:
      'We prioritise partners with ethical practices, transparent pricing, and sustainable tourism initiatives across every itinerary.',
  },
  {
    title: 'Technology with heart',
    description:
      'Dynamic search, collaborative dashboards, and proactive alerts keep trips on track while our team stays one message away.',
  },
]

export default function AboutPage() {
  usePageMetadata({
    title: 'About VyuGo Holidays | Boutique travel house in India',
    description:
      'Learn how VyuGo Holidays crafts bespoke Indian journeys from our Kakinada headquarters and Hyderabad experience lounge.',
    keywords: 'About VyuGo Holidays, Kakinada travel agency, Hyderabad travel lounge',
    canonicalPath: '/about',
  })

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="space-y-4 text-center">
        <span className="badge bg-secondary/10 text-secondary">About VyuGo Holidays</span>
        <h1 className="section-title">Crafting soulful journeys since 2016</h1>
        <p className="section-subtitle mx-auto">
          VyuGo Holidays is a boutique travel house headquartered in coastal Kakinada with an experience center in Hyderabad. We
          combine human insight with powerful planning tools to design holidays that feel effortless, authentic, and memorable.
        </p>
      </header>

      <section className="mt-12 grid gap-8 md:grid-cols-[1.2fr,1fr] md:items-center">
        <div className="space-y-4 text-left text-slate-700">
          <h2 className="text-2xl font-semibold text-slate-900">Our story</h2>
          <p>
            What began as a neighbourhood storefront near Satya Gowri Theatre is now a full-service travel studio serving leisure,
            corporate, and group travelers worldwide. Our consultants curate every escape—from flights and stays to guided
            experiences—while our digital platform gives guests clarity at every step.
          </p>
          <p>
            Whether you are planning a quick coastal getaway or a multi-country celebration, we bring together trusted partners,
            transparent pricing, and concierge-style service tailored to your pace.
          </p>
        </div>
        <div className="card items-center justify-center bg-white text-center">
          <img src={heroImage} alt="VyuGo Holidays" className="mx-auto h-24 w-auto" />
          <p className="mt-4 text-sm text-slate-500">
            Headquarters: 1st Floor, Cinema Rd, Opp. Satya Gowri Theatre, Suryanarayana Puram, Kakinada, Andhra Pradesh 533001
          </p>
          <p className="mt-2 text-sm text-slate-500">Branch lounge: Jubilee Hills, Hyderabad, Telangana</p>
        </div>
      </section>

      <section className="mt-16 space-y-10">
        <h2 className="text-2xl font-semibold text-slate-900">Milestones</h2>
        <div className="space-y-6">
          {milestones.map((milestone) => (
            <article key={milestone.year} className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-card md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">{milestone.year}</p>
                <h3 className="text-lg font-semibold text-slate-900">{milestone.title}</h3>
              </div>
              <p className="text-sm text-slate-600 md:max-w-xl">{milestone.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-900">What guides us</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="card h-full bg-white">
              <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{value.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
