import { prisma } from '../lib/prisma'
import { asStringArray } from '../utils/json'
import { buildSearchEnvelope, computeRange, uniqueValues } from '../utils/searchEnvelope'

export type HolidaySearchCriteria = {
  theme?: string
  destination?: string
  startDate?: string
  endDate?: string
  travelers?: number
  budget?: number
  market?: string
}

export const searchHolidays = async (criteria: HolidaySearchCriteria) => {
  const filters = [] as Record<string, unknown>[]

  if (criteria.destination) {
    filters.push({ destination: { contains: criteria.destination, mode: 'insensitive' as const } })
  }

  if (criteria.theme) {
    filters.push({ theme: criteria.theme })
  }

  if (criteria.market) {
    filters.push({ market: criteria.market })
  }

  const holidays = await prisma.holidayPackage.findMany({
    where: filters.length ? { AND: filters } : undefined,
    orderBy: { pricePerPerson: 'asc' },
  })

  const items = holidays.filter((holiday) => {
    if (!criteria.budget || !criteria.travelers) return true
    return holiday.pricePerPerson * criteria.travelers <= criteria.budget
  })

  const serialized = items.map((holiday) => ({
    id: holiday.id,
    name: holiday.name,
    destination: holiday.destination,
    theme: holiday.theme,
    duration: holiday.duration,
    pricePerPerson: holiday.pricePerPerson,
    travelersIncluded: holiday.travelersIncluded,
    highlights: asStringArray(holiday.highlights),
    description: holiday.description,
    market: holiday.market,
    gallery: asStringArray(holiday.gallery),
  }))

  return buildSearchEnvelope('holidays', criteria, serialized, (collection) => ({
    themes: uniqueValues(collection.map((item) => item.theme)).sort(),
    durations: uniqueValues(collection.map((item) => item.duration)).sort(),
    priceRange: computeRange(collection.map((item) => item.pricePerPerson)),
    markets: uniqueValues(collection.map((item) => item.market)),
  }))
}

export const getHolidayById = async (id: string) => {
  const holiday = await prisma.holidayPackage.findUnique({ where: { id } })
  if (!holiday) return null
  return {
    id: holiday.id,
    name: holiday.name,
    destination: holiday.destination,
    theme: holiday.theme,
    duration: holiday.duration,
    pricePerPerson: holiday.pricePerPerson,
    travelersIncluded: holiday.travelersIncluded,
    highlights: asStringArray(holiday.highlights),
    description: holiday.description,
    market: holiday.market,
    gallery: asStringArray(holiday.gallery),
  }
}
