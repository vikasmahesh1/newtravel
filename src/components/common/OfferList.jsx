import promotions from '../../data/promotions.js'
import { OfferCard } from './OfferCard'

export function OfferList() {
  return (
    <section id="deals" className="mx-auto mt-16 max-w-6xl px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="section-title">Deals tailored for your wanderlist</h2>
          <p className="section-subtitle">
            Unlock curated flight and stay bundles, loyalty perks, and flexible payment options engineered for explorers.
          </p>
        </div>
        <button className="btn-secondary w-full md:w-auto">View all offers</button>
      </div>
      <div className="mt-8 grid-auto-fit">
        {promotions.map((promotion) => (
          <OfferCard key={promotion.id} {...promotion} />
        ))}
      </div>
    </section>
  )
}
