import { useMemo, useState } from 'react'
import promotions from '../../data/promotions.js'
import { OfferCard } from './OfferCard'
import { MarketSelector } from './MarketSelector'

export function OfferList() {
  const [marketFilter, setMarketFilter] = useState('Domestic')
  const filteredPromotions = useMemo(
    () => promotions.filter((promotion) => (marketFilter ? promotion.market === marketFilter : true)),
    [marketFilter]
  )

  return (
    <section id="deals" className="mx-auto mt-16 max-w-6xl px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="section-title">Deals handpicked by VyuGo concierges</h2>
          <p className="section-subtitle">
            Unlock flight, stay, and holiday bundles with loyalty perks and flexible payment options engineered for explorers.
          </p>
        </div>
        <button className="btn-secondary w-full md:w-auto">View all VyuGo exclusives</button>
      </div>
      <div className="mt-6">
        <MarketSelector
          value={marketFilter}
          onChange={setMarketFilter}
          idPrefix="promotion-market"
          label="Highlight"
        />
      </div>
      <div className="mt-8 grid-auto-fit">
        {filteredPromotions.map((promotion) => (
          <OfferCard key={promotion.id} {...promotion} />
        ))}
      </div>
    </section>
  )
}
