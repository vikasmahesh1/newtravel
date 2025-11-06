export const DEFAULT_CURRENCY = 'INR'
export const SAMPLE_GENERATED_AT = '2024-05-01T09:00:00.000Z'

export const SEARCH_SCHEMAS = {
  flights: 'vyugo.flights.search',
  hotels: 'vyugo.hotels.search',
  buses: 'vyugo.buses.search',
  holidays: 'vyugo.holidays.search',
} as const

export type SearchDomain = keyof typeof SEARCH_SCHEMAS
