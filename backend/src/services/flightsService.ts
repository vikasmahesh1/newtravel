import { prisma } from '../lib/prisma'
import { buildSearchEnvelope, computeIsoRange, computeRange, uniqueValues } from '../utils/searchEnvelope'

export type FlightSearchCriteria = {
  origin?: string
  destination?: string
  date?: string
  passengers?: number
  cabin?: string
  market?: string
}

export const searchFlights = async (criteria: FlightSearchCriteria) => {
  const filters = [] as Record<string, unknown>[]

  if (criteria.destination) {
    filters.push({ to: { contains: criteria.destination, mode: 'insensitive' as const } })
  }

  if (criteria.origin) {
    filters.push({ from: { contains: criteria.origin, mode: 'insensitive' as const } })
  }

  if (criteria.market) {
    filters.push({ market: criteria.market })
  }

  const flights = await prisma.flight.findMany({
    where: filters.length ? { AND: filters } : undefined,
    orderBy: { departure: 'asc' },
  })

  const items = flights.map((flight) => ({
    id: flight.id,
    airline: flight.airline,
    from: flight.from,
    to: flight.to,
    departure: flight.departure.toISOString(),
    arrival: flight.arrival.toISOString(),
    duration: flight.duration,
    stops: flight.stops,
    price: flight.price,
    fareClass: flight.fareClass,
    amenities: flight.amenities,
    market: flight.market,
    region: flight.region,
  }))

  return buildSearchEnvelope('flights', criteria, items, (collection) => ({
    airlines: uniqueValues(collection.map((item) => item.airline)),
    fareClasses: uniqueValues(collection.map((item) => item.fareClass)),
    stopOptions: uniqueValues(collection.map((item) => item.stops)).sort((a, b) => a - b),
    priceRange: computeRange(collection.map((item) => item.price)),
    travelDates: computeIsoRange(collection.map((item) => item.departure)),
    markets: uniqueValues(collection.map((item) => item.market)),
  }))
}

export const getFlightById = async (id: string) => {
  const flight = await prisma.flight.findUnique({ where: { id } })
  if (!flight) return null
  return {
    id: flight.id,
    airline: flight.airline,
    from: flight.from,
    to: flight.to,
    departure: flight.departure.toISOString(),
    arrival: flight.arrival.toISOString(),
    duration: flight.duration,
    stops: flight.stops,
    price: flight.price,
    fareClass: flight.fareClass,
    amenities: flight.amenities,
    market: flight.market,
    region: flight.region,
  }
}
