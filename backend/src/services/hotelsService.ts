import { prisma } from '../lib/prisma'
import { buildSearchEnvelope, computeRange, uniqueValues } from '../utils/searchEnvelope'

export type HotelSearchCriteria = {
  destination?: string
  checkIn?: string
  checkOut?: string
  guests?: number
  rooms?: number
  market?: string
}

export const searchHotels = async (criteria: HotelSearchCriteria) => {
  const filters = [] as Record<string, unknown>[]

  if (criteria.destination) {
    filters.push({ location: { contains: criteria.destination, mode: 'insensitive' as const } })
  }

  if (criteria.market) {
    filters.push({ market: criteria.market })
  }

  const hotels = await prisma.hotel.findMany({
    where: filters.length ? { AND: filters } : undefined,
    orderBy: { pricePerNight: 'asc' },
  })

  const items = hotels.map((hotel) => ({
    id: hotel.id,
    name: hotel.name,
    location: hotel.location,
    pricePerNight: hotel.pricePerNight,
    rating: hotel.rating,
    amenities: hotel.amenities,
    market: hotel.market,
    images: hotel.images,
    gallery: hotel.gallery,
    description: hotel.description,
  }))

  return buildSearchEnvelope('hotels', criteria, items, (collection) => ({
    starRatings: uniqueValues(collection.map((item) => item.rating)).sort((a, b) => b - a),
    amenityHighlights: uniqueValues(
      collection.flatMap((item) => item.amenities.slice(0, 6))
    ).sort(),
    priceRange: computeRange(collection.map((item) => item.pricePerNight)),
    markets: uniqueValues(collection.map((item) => item.market)),
  }))
}

export const getHotelById = async (id: string) => {
  const hotel = await prisma.hotel.findUnique({ where: { id } })
  if (!hotel) return null
  return {
    id: hotel.id,
    name: hotel.name,
    location: hotel.location,
    pricePerNight: hotel.pricePerNight,
    rating: hotel.rating,
    amenities: hotel.amenities,
    market: hotel.market,
    images: hotel.images,
    gallery: hotel.gallery,
    description: hotel.description,
  }
}
