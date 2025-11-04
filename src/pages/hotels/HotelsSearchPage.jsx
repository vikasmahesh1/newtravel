import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HotelSearchForm } from '../../components/common/HotelSearchForm'
import { DataContractNote } from '../../components/common/DataContractNote'
import { searchHotels } from '../../features/search/searchSlice'
import { selectSearchDomain } from '../../store'
import { formatINRCurrency } from '../../utils/formatters'
import { usePageMetadata } from '../../hooks/usePageMetadata'

const ratingFilters = [
  { id: 'all', label: 'All ratings' },
  { id: '4', label: '4 stars & up', min: 4 },
  { id: '4.5', label: '4.5 stars & up', min: 4.5 },
]

export default function HotelsSearchPage() {
  const dispatch = useDispatch()
  const { criteria, results, status, meta, schema } = useSelector((state) =>
    selectSearchDomain(state, 'hotels')
  )
  const [selectedRating, setSelectedRating] = useState('all')
  const [sortBy, setSortBy] = useState('price-asc')

  usePageMetadata({
    title: 'Book boutique hotels and stays in India | VyuGo Holidays',
    description: 'Browse curated Indian hotels and resorts with VyuGo Holidays—filter by rating, experiences, and price to find your stay.',
    keywords: 'book hotels India, boutique stays India, VyuGo hotels',
    canonicalPath: '/hotels',
  })

  useEffect(() => {
    if (!results.length && status === 'idle') {
      dispatch(searchHotels(criteria))
    }
  }, [dispatch, criteria, results.length, status])

  const filteredResults = useMemo(() => {
    let hotels = [...results]
    if (selectedRating !== 'all') {
      const min = Number(selectedRating)
      hotels = hotels.filter((hotel) => hotel.rating >= min)
    }
    if (sortBy === 'price-desc') {
      hotels.sort((a, b) => b.pricePerNight - a.pricePerNight)
    } else if (sortBy === 'rating-desc') {
      hotels.sort((a, b) => b.rating - a.rating)
    } else {
      hotels.sort((a, b) => a.pricePerNight - b.pricePerNight)
    }
    return hotels
  }, [results, selectedRating, sortBy])

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="space-y-4">
        <span className="badge">Hotels</span>
        <h1 className="section-title">Stay where design meets comfort</h1>
        <p className="section-subtitle">
          Discover boutique properties, smart apartments, and resorts with perks tailored to your style.
        </p>
      </header>
      <div className="mt-8 rounded-3xl bg-white p-6 shadow-card">
        <HotelSearchForm compact />
      </div>
      <section className="mt-10 space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {filteredResults.length} {filteredResults.length === 1 ? 'property' : 'properties'} found
            </h2>
            <p className="text-sm text-slate-500">In {criteria.destination || 'top destinations'}.</p>
            {meta?.priceRange && (
              <p className="mt-1 text-xs text-slate-400">
                Sample tariff spans {formatINRCurrency(meta.priceRange.min)} –{' '}
                {formatINRCurrency(meta.priceRange.max)} with {meta.total} curated stays.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
              Rating
              <select className="input" value={selectedRating} onChange={(event) => setSelectedRating(event.target.value)}>
                {ratingFilters.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
              Sort by
              <select className="input" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Top Rated</option>
              </select>
            </label>
          </div>
        </div>
        <div className="space-y-4">
          {status === 'loading' && (
            <p role="status" className="text-sm text-slate-500">
              Loading stays…
            </p>
          )}
          {status === 'failed' && <p className="text-sm text-red-500">We were unable to load hotels.</p>}
          {filteredResults.map((hotel) => (
            <Link
              to={`/hotels/${hotel.id}`}
              key={hotel.id}
              className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-xl md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-slate-900">{hotel.name}</h3>
                <p className="text-sm text-slate-500">{hotel.location}</p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  <span>⭐ {hotel.rating}</span>
                  {hotel.amenities.slice(0, 3).map((amenity) => (
                    <span key={amenity} className="rounded-full bg-primary/10 px-3 py-1">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-slate-900">{formatINRCurrency(hotel.pricePerNight)}</p>
                <p className="text-xs text-slate-500">per night</p>
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
