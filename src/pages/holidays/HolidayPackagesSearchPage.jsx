import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HolidaySearchForm } from '../../components/common/HolidaySearchForm'
import { searchHolidays } from '../../features/search/searchSlice'
import { selectSearchDomain } from '../../store'
import { formatINRCurrency } from '../../utils/formatters'
import { usePageMetadata } from '../../hooks/usePageMetadata'

const sortOptions = [
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'duration', label: 'Duration' },
]

export default function HolidayPackagesSearchPage() {
  const dispatch = useDispatch()
  const { criteria, results, status } = useSelector((state) => selectSearchDomain(state, 'holidays'))
  const [selectedTheme, setSelectedTheme] = useState('all')
  const [sortBy, setSortBy] = useState('price-asc')

  usePageMetadata({
    title: 'Curated holiday packages across India | VyuGo Holidays',
    description:
      'Explore handcrafted Indian holiday packages featuring boutique stays, private guides, and immersive experiences from VyuGo Holidays.',
    keywords: 'holiday packages India, curated tours India, VyuGo holidays',
    canonicalPath: '/holidays',
  })

  useEffect(() => {
    if (!results.length && status === 'idle') {
      dispatch(searchHolidays(criteria))
    }
  }, [dispatch, criteria, results.length, status])

  const filteredResults = useMemo(() => {
    let packages = [...results]
    if (selectedTheme !== 'all') {
      packages = packages.filter((trip) => trip.theme === selectedTheme)
    }

    if (sortBy === 'price-desc') {
      packages.sort((a, b) => b.pricePerPerson - a.pricePerPerson)
    } else if (sortBy === 'duration') {
      packages.sort((a, b) => {
        const parseDuration = (duration) => Number(duration.split(' ')[0])
        return parseDuration(a.duration) - parseDuration(b.duration)
      })
    } else {
      packages.sort((a, b) => a.pricePerPerson - b.pricePerPerson)
    }

    return packages
  }, [results, selectedTheme, sortBy])

  const availableThemes = useMemo(() => {
    const unique = new Set(results.map((trip) => trip.theme))
    return Array.from(unique)
  }, [results])

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="space-y-4">
        <span className="badge">Holiday packages</span>
        <h1 className="section-title">Tailor-made journeys with VyuGo specialists</h1>
        <p className="section-subtitle">
          Blend flights, stays, guides, and signature experiences into one seamless booking. Every itinerary is handcrafted by
          VyuGo Holidays curators.
        </p>
      </header>
      <div className="mt-8 rounded-3xl bg-white p-6 shadow-card">
        <HolidaySearchForm compact />
      </div>
      <section className="mt-10 space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {filteredResults.length} curated {filteredResults.length === 1 ? 'escape' : 'escapes'} ready for you
            </h2>
            <p className="text-sm text-slate-500">
              {criteria.destination ? `Around ${criteria.destination}` : 'Across our most-loved destinations'}.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
              Theme
              <select className="input" value={selectedTheme} onChange={(event) => setSelectedTheme(event.target.value)}>
                <option value="all">All</option>
                {availableThemes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
              Sort by
              <select className="input" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="space-y-4">
          {status === 'loading' && (
            <p role="status" className="text-sm text-slate-500">
              Crafting holiday ideas…
            </p>
          )}
          {status === 'failed' && <p className="text-sm text-red-500">We were unable to load holiday packages.</p>}
          {!filteredResults.length && status === 'succeeded' && (
            <p className="text-sm text-slate-500">No packages match your filters. Try widening your destination or budget.</p>
          )}
          {filteredResults.map((trip) => (
            <Link
              to={`/holidays/${trip.id}`}
              key={trip.id}
              className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-xl md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-slate-900">{trip.name}</h3>
                <p className="text-sm text-slate-500">{trip.destination}</p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{trip.theme}</span>
                  <span>{trip.duration}</span>
                  <span>{trip.travelersIncluded} travelers included</span>
                </div>
                <ul className="flex flex-wrap gap-2 text-xs text-slate-500">
                  {trip.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="rounded-full bg-secondary/10 px-3 py-1 text-secondary">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-slate-900">{formatINRCurrency(trip.pricePerPerson)}</p>
                <p className="text-xs text-slate-500">per person</p>
                <span className="badge mt-3 inline-flex bg-primary/10 text-primary">View itinerary</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
