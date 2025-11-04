import { HeroSearchPanel } from '../../components/common/HeroSearchPanel'
import { PopularRoutesGrid } from '../../components/common/PopularRoutesGrid'
import { OfferList } from '../../components/common/OfferList'

export default function Home() {
  return (
    <div className="pb-16">
      <HeroSearchPanel />
      <section id="popular" className="mx-auto mt-20 max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="section-title">Plan smarter with dynamic search</h2>
            <p className="section-subtitle">
              Sync preferences across devices, track fare drops, and compare eco-impact across flights, hotels, and buses.
            </p>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• Saved searches with price alerts in your dashboard</li>
              <li>• Flexible payment options and carbon offsets</li>
              <li>• Personalized recommendations based on your travel DNA</li>
            </ul>
          </div>
          <div className="card space-y-4 bg-white">
            <h3 className="text-xl font-semibold text-slate-900">Traveler insights</h3>
            <p className="text-sm text-slate-600">
              “NewTravel helped us orchestrate a multi-city honeymoon with lounge access, boutique stays, and scenic transfers—
              all synced in one itinerary.”
            </p>
            <p className="text-sm font-semibold text-slate-500">— Priya & Luca</p>
          </div>
        </div>
      </section>
      <PopularRoutesGrid />
      <OfferList />
    </div>
  )
}
