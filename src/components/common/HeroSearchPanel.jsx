import { useState } from 'react'
import { FlightSearchForm } from './FlightSearchForm'
import { HotelSearchForm } from './HotelSearchForm'
import { BusSearchForm } from './BusSearchForm'
import { HolidaySearchForm } from './HolidaySearchForm'

const tabs = [
  { id: 'flights', label: 'Flights', icon: '✈️', description: 'Book multi-city, premium cabins, and more.' },
  { id: 'hotels', label: 'Hotels', icon: '🏨', description: 'Stay with curated properties and member perks.' },
  { id: 'buses', label: 'Buses', icon: '🚌', description: 'Connect regional hubs with carbon-conscious rides.' },
  {
    id: 'holidays',
    label: 'Holiday packages',
    icon: '🧳',
    description: 'Handcrafted escapes with guides, stays, and experiences bundled for you.',
  },
]

export function HeroSearchPanel() {
  const [activeTab, setActiveTab] = useState('flights')

  return (
    <section className="relative overflow-visible bg-gradient-to-br from-secondary via-primary to-accent py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <span className="badge bg-white/20 text-white">VyuGo Holidays</span>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
            Signature escapes across flights, stays, rides, and retreats
          </h1>
          <p className="text-base text-white/80">
            Compare flexible fares, member-exclusive rates, guided experiences, and curated itineraries—all in one place.
          </p>
          <div className="flex gap-3">
            <a href="#deals" className="btn-secondary bg-white text-secondary hover:bg-orange-100 hover:text-secondary">
              Browse offers
            </a>
            <a href="#popular" className="btn-primary">
              Plan a getaway
            </a>
          </div>
        </div>
        <div className="card space-y-6 bg-white text-slate-900">
          <div className="flex gap-2 rounded-full bg-slate-100 p-1 text-sm font-semibold">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-full px-4 py-2 transition ${
                  activeTab === tab.id ? 'bg-white text-primary shadow' : 'text-slate-500 hover:text-primary'
                }`}
                type="button"
                aria-pressed={activeTab === tab.id}
              >
                <span className="mr-1" aria-hidden>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-500">
            {tabs.find((tab) => tab.id === activeTab)?.description}
          </p>
          {activeTab === 'flights' && <FlightSearchForm />}
          {activeTab === 'hotels' && <HotelSearchForm />}
          {activeTab === 'buses' && <BusSearchForm />}
          {activeTab === 'holidays' && <HolidaySearchForm />}
        </div>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-10 hidden h-64 w-[120%] -translate-x-1/2 overflow-hidden md:block">
        <div className="absolute flex gap-6 opacity-70 animate-carousel">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex h-24 w-48 items-center justify-center rounded-3xl bg-white/10 text-4xl"
              aria-hidden
            >
              {['🌴', '🏔️', '🏙️', '🏝️', '🛫', '🗺️', '🎒', '🍣'][index % 8]}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
