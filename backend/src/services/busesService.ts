import { prisma } from '../lib/prisma'
import { asStringArray } from '../utils/json'
import { buildSearchEnvelope, computeIsoRange, computeRange, uniqueValues } from '../utils/searchEnvelope'

export type BusSearchCriteria = {
  origin?: string
  destination?: string
  date?: string
  passengers?: number
  market?: string
}

export const searchBuses = async (criteria: BusSearchCriteria) => {
  const filters = [] as Record<string, unknown>[]

  if (criteria.origin) {
    filters.push({ route: { contains: criteria.origin, mode: 'insensitive' as const } })
  }

  if (criteria.destination) {
    filters.push({ route: { contains: criteria.destination, mode: 'insensitive' as const } })
  }

  if (criteria.market) {
    filters.push({ market: criteria.market })
  }

  const buses = await prisma.busRoute.findMany({
    where: filters.length ? { AND: filters } : undefined,
    orderBy: { departure: 'asc' },
  })

  const items = buses.map((bus) => ({
    id: bus.id,
    operator: bus.operator,
    route: bus.route,
    departure: bus.departure.toISOString(),
    arrival: bus.arrival.toISOString(),
    duration: bus.duration,
    price: bus.price,
    amenities: asStringArray(bus.amenities),
    seating: bus.seating,
    description: bus.description,
    market: bus.market,
  }))

  return buildSearchEnvelope('buses', criteria, items, (collection) => ({
    operators: uniqueValues(collection.map((item) => item.operator)).sort(),
    seatingTypes: uniqueValues(collection.map((item) => item.seating)).sort(),
    priceRange: computeRange(collection.map((item) => item.price)),
    travelWindow: computeIsoRange(collection.map((item) => item.departure)),
    markets: uniqueValues(collection.map((item) => item.market)),
  }))
}

export const getBusById = async (id: string) => {
  const bus = await prisma.busRoute.findUnique({ where: { id } })
  if (!bus) return null
  return {
    id: bus.id,
    operator: bus.operator,
    route: bus.route,
    departure: bus.departure.toISOString(),
    arrival: bus.arrival.toISOString(),
    duration: bus.duration,
    price: bus.price,
    amenities: asStringArray(bus.amenities),
    seating: bus.seating,
    description: bus.description,
    market: bus.market,
  }
}
