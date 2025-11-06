import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FlightSearchForm } from '../../components/common/FlightSearchForm'
import { DataContractNote } from '../../components/common/DataContractNote'
import { searchFlights } from '../../features/search/searchSlice'
import { selectSearchDomain } from '../../store'
import { formatDateTime, formatINRCurrency } from '../../utils/formatters'
import { usePageMetadata } from '../../hooks/usePageMetadata'

const sortOptions = [
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'duration', label: 'Shortest Duration' },
]

export default function FlightsSearchPage() {
  const dispatch = useDispatch()
  const { criteria, results, status, meta, schema } = useSelector((state) =>
    selectSearchDomain(state, 'flights')
  )
  const [selectedStops, setSelectedStops] = useState('all')
  const [sortBy, setSortBy] = useState('price-asc')

  usePageMetadata({
    title: 'Search flights across India with VyuGo Holidays',
    description: 'Compare fares, cabins, and routes for domestic and international flights departing India with VyuGo Holidays.',
    keywords: 'flight search India, book flights, airline tickets VyuGo',
    canonicalPath: '/flights',
  })

  useEffect(() => {
    if (!results.length && status === 'idle') {
      dispatch(searchFlights(criteria))
    }
  }, [dispatch, criteria, results.length, status])

  const filteredResults = useMemo(() => {
    let flights = [...results]
    if (selectedStops !== 'all') {
      const stopCount = Number(selectedStops)
      flights = flights.filter((flight) => flight.stops === stopCount)
    }
    switch (sortBy) {
      case 'price-desc':
        flights.sort((a, b) => b.price - a.price)
        break
      case 'duration':
        flights.sort((a, b) =>
          parseInt(a.duration.replace(/\D/g, ''), 10) - parseInt(b.duration.replace(/\D/g, ''), 10)
        )
        break
      default:
        flights.sort((a, b) => a.price - b.price)
    }
    return flights
  }, [results, selectedStops, sortBy])

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="space-y-4">
        <span className="badge">Flights</span>
        <h1 className="section-title">Compare flexible fares and smart connections</h1>
        <p className="section-subtitle">
          Filter by cabin, stops, and amenities to craft the perfect itinerary.
        </p>
      </header>
      <div className="mt-8 rounded-3xl bg-white p-6 shadow-card">
        <FlightSearchForm compact />
      </div>
      <section className="mt-10 space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Showing {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'}
            </h2>
            <p className="text-sm text-slate-500">
              {criteria.market} journeys departing from {criteria.origin || 'anywhere'} to {criteria.destination || 'anywhere'}.
            </p>
            {meta && (
              <p className="mt-1 text-xs text-slate-400">
                Sample dataset contains {meta.total} departures spanning {meta.travelDates?.start ? 'from ' : ''}
                {meta.travelDates?.start ? formatDateTime(meta.travelDates.start) : 'today'} to{' '}
                {meta.travelDates?.end ? formatDateTime(meta.travelDates.end) : 'the coming weeks'}.
              </p>
            )}
            {criteria.market === 'International' && (
              <p className="mt-1 text-xs text-primary/70">
                Tip: Long-haul fares show inclusive lounge access and multi-currency settlement support.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
              Stops
              <select
                className="input input--select"
                value={selectedStops}
                onChange={(event) => setSelectedStops(event.target.value)}
              >
                <option value="all">All</option>
                <option value="0">Nonstop</option>
                <option value="1">1 Stop</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
              Sort by
              <select className="input input--select" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
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
              Loading itineraries…
            </p>
          )}
          {status === 'failed' && <p className="text-sm text-red-500">We were unable to load flights.</p>}
          {filteredResults.map((flight) => (
            <Link
              to={`/flights/${flight.id}`}
              key={flight.id}
              className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-xl md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary">{flight.airline}</p>
                <p className="text-lg font-semibold text-slate-900">
                  {flight.from} → {flight.to}
                </p>
                <p className="text-sm text-slate-500">
                  Depart {formatDateTime(flight.departure)} · Arrive {formatDateTime(flight.arrival)}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-secondary/10 px-3 py-1 text-secondary">{flight.market}</span>
                  <span>{flight.duration}</span>
                  <span>• {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}</span>
                  <span>• {flight.fareClass}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-slate-900">{formatINRCurrency(flight.price)}</p>
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
