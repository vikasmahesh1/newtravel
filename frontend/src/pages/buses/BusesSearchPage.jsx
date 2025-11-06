import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BusSearchForm } from '../../components/common/BusSearchForm'
import { DataContractNote } from '../../components/common/DataContractNote'
import { searchBuses } from '../../features/search/searchSlice'
import { selectSearchDomain } from '../../store'
import { formatDateTime, formatINRCurrency } from '../../utils/formatters'
import { usePageMetadata } from '../../hooks/usePageMetadata'

const seatingFilters = [
  { id: 'all', label: 'All seating' },
  { id: 'Recliner', label: 'Recliner' },
  { id: 'Luxury coach', label: 'Luxury coach' },
]

export default function BusesSearchPage() {
  const dispatch = useDispatch()
  const { criteria, results, status, meta, schema } = useSelector((state) =>
    selectSearchDomain(state, 'buses')
  )
  const [selectedSeating, setSelectedSeating] = useState('all')
  const [sortBy, setSortBy] = useState('price-asc')

  usePageMetadata({
    title: 'Book bus journeys across India | VyuGo Holidays',
    description: 'Plan premium and intercity Indian bus journeys with comfortable amenities through VyuGo Holidays.',
    keywords: 'book bus India, intercity bus tickets, VyuGo buses',
    canonicalPath: '/buses',
  })

  useEffect(() => {
    if (!results.length && status === 'idle') {
      dispatch(searchBuses(criteria))
    }
  }, [dispatch, criteria, results.length, status])

  const filteredResults = useMemo(() => {
    let buses = [...results]
    if (selectedSeating !== 'all') {
      buses = buses.filter((bus) => bus.seating === selectedSeating)
    }
    if (sortBy === 'duration') {
      buses.sort((a, b) =>
        parseInt(a.duration.replace(/\D/g, ''), 10) - parseInt(b.duration.replace(/\D/g, ''), 10)
      )
    } else if (sortBy === 'price-desc') {
      buses.sort((a, b) => b.price - a.price)
    } else {
      buses.sort((a, b) => a.price - b.price)
    }
    return buses
  }, [results, selectedSeating, sortBy])

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="space-y-4">
        <span className="badge">Buses</span>
        <h1 className="section-title">Go scenic with curated coach journeys</h1>
        <p className="section-subtitle">
          Handpicked routes with amenities, carbon insights, and flexible tickets.
        </p>
      </header>
      <div className="mt-8 rounded-3xl bg-white p-6 shadow-card">
        <BusSearchForm compact />
      </div>
      <section className="mt-10 space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{filteredResults.length} coach options</h2>
            <p className="text-sm text-slate-500">
              {criteria.market} routes from {criteria.origin || 'any origin'} to {criteria.destination || 'any destination'}.
            </p>
            {meta?.operators?.length ? (
              <p className="mt-1 text-xs text-slate-400">
                Operators represented: {meta.operators.join(', ')}.
              </p>
            ) : null}
            {criteria.market === 'International' && (
              <p className="mt-1 text-xs text-primary/70">
                Cross-border journeys include smart immigration briefings and 24x7 concierge updates en route.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
              Seating
            <select
              className="input input--select"
              value={selectedSeating}
              onChange={(event) => setSelectedSeating(event.target.value)}
            >
                {seatingFilters.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
              Sort by
            <select
              className="input input--select"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Shortest duration</option>
              </select>
            </label>
          </div>
        </div>
        <div className="space-y-4">
          {status === 'loading' && (
            <p role="status" className="text-sm text-slate-500">
              Loading coaches…
            </p>
          )}
          {status === 'failed' && <p className="text-sm text-red-500">We were unable to load buses.</p>}
          {filteredResults.map((bus) => (
            <Link
              to={`/buses/${bus.id}`}
              key={bus.id}
              className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-xl md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900">{bus.route}</h3>
                <p className="text-sm text-slate-500">
                  Depart {formatDateTime(bus.departure)} · Arrive {formatDateTime(bus.arrival)}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{bus.market}</span>
                  <span>{bus.duration}</span>
                  <span>• {bus.operator}</span>
                  <span>• {bus.seating}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-slate-900">{formatINRCurrency(bus.price)}</p>
                <p className="text-xs text-slate-500">per traveler</p>
                <span className="badge mt-3 inline-flex bg-secondary/10 text-secondary">View details</span>
              </div>
            </Link>
          ))}
        </div>
        <DataContractNote schema={schema} generatedAt={meta?.generatedAt} />
      </section>
    </div>
  )
}
