import flights from '../data/flights.js'
import hotels from '../data/hotels.js'
import buses from '../data/buses.js'
import holidays from '../data/holidays.js'
import { DEFAULT_CURRENCY, SAMPLE_GENERATED_AT, SEARCH_SCHEMAS } from '../data/constants.js'
import { runtimeConfig } from './environment'

const wait = (delay = 400) => new Promise((resolve) => setTimeout(resolve, delay))

const uniqueValues = (values) => Array.from(new Set(values))

const computeRange = (items, accessor) => {
  if (!items.length) return null
  const values = items.map(accessor)
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  }
}

const computeIsoRange = (items, accessor) => {
  if (!items.length) return null
  const timestamps = items.map((item) => new Date(accessor(item)).getTime())
  return {
    start: new Date(Math.min(...timestamps)).toISOString(),
    end: new Date(Math.max(...timestamps)).toISOString(),
  }
}

const buildSearchEnvelope = (domain, criteria, items, metaFactory = () => ({})) => ({
  schema: SEARCH_SCHEMAS[domain],
  criteria: { ...criteria },
  items,
  meta: {
    total: items.length,
    currency: DEFAULT_CURRENCY,
    generatedAt: SAMPLE_GENERATED_AT,
    source: runtimeConfig.useMocks ? 'mock-data' : 'api',
    ...metaFactory(items),
  },
})

const buildUrl = (path) => {
  const prefix = runtimeConfig.apiBaseUrl
  if (!path.startsWith('/')) {
    return `${prefix}/${path}`
  }
  return `${prefix}${path}`
}

const defaultHeaders = () => {
  const headers = { 'Content-Type': 'application/json' }
  if (runtimeConfig.authToken) {
    headers.Authorization = `Bearer ${runtimeConfig.authToken}`
  }
  return headers
}

const handleResponse = async (response) => {
  if (response.status === 204) return null
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`
    throw new Error(message)
  }
  return data
}

const backendApi = {
  async searchFlights(criteria) {
    const response = await fetch(buildUrl('/flights/search'), {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(criteria),
    })
    return handleResponse(response)
  },
  async searchHotels(criteria) {
    const response = await fetch(buildUrl('/hotels/search'), {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(criteria),
    })
    return handleResponse(response)
  },
  async searchBuses(criteria) {
    const response = await fetch(buildUrl('/buses/search'), {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(criteria),
    })
    return handleResponse(response)
  },
  async searchHolidays(criteria) {
    const response = await fetch(buildUrl('/holidays/search'), {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(criteria),
    })
    return handleResponse(response)
  },
  async getFlightById(id) {
    const response = await fetch(buildUrl(`/flights/${id}`), {
      method: 'GET',
      headers: defaultHeaders(),
    })
    return handleResponse(response)
  },
  async getHotelById(id) {
    const response = await fetch(buildUrl(`/hotels/${id}`), {
      method: 'GET',
      headers: defaultHeaders(),
    })
    return handleResponse(response)
  },
  async getBusById(id) {
    const response = await fetch(buildUrl(`/buses/${id}`), {
      method: 'GET',
      headers: defaultHeaders(),
    })
    return handleResponse(response)
  },
  async getHolidayById(id) {
    const response = await fetch(buildUrl(`/holidays/${id}`), {
      method: 'GET',
      headers: defaultHeaders(),
    })
    return handleResponse(response)
  },
}

const mockApiImpl = {
  async searchFlights(criteria) {
    await wait()
    const filteredFlights = flights
      .filter((flight) =>
        criteria.destination
          ? flight.to.toLowerCase().includes(criteria.destination.toLowerCase())
          : true
      )
      .filter((flight) =>
        criteria.origin
          ? flight.from.toLowerCase().includes(criteria.origin.toLowerCase())
          : true
      )
      .filter((flight) => (criteria.market ? flight.market === criteria.market : true))

    return buildSearchEnvelope('flights', criteria, filteredFlights, (items) => ({
      airlines: uniqueValues(items.map((item) => item.airline)),
      fareClasses: uniqueValues(items.map((item) => item.fareClass)),
      stopOptions: uniqueValues(items.map((item) => item.stops)).sort((a, b) => a - b),
      priceRange: computeRange(items, (item) => item.price),
      travelDates: computeIsoRange(items, (item) => item.departure),
      markets: uniqueValues(items.map((item) => item.market)),
    }))
  },
  async searchHotels(criteria) {
    await wait()
    const filteredHotels = hotels
      .filter((hotel) =>
        criteria.destination
          ? hotel.location.toLowerCase().includes(criteria.destination.toLowerCase())
          : true
      )
      .filter((hotel) => (criteria.market ? hotel.market === criteria.market : true))

    return buildSearchEnvelope('hotels', criteria, filteredHotels, (items) => ({
      starRatings: uniqueValues(items.map((item) => item.rating)).sort((a, b) => b - a),
      amenityHighlights: uniqueValues(
        items.flatMap((item) => item.amenities.slice(0, 6))
      ).sort(),
      priceRange: computeRange(items, (item) => item.pricePerNight),
      markets: uniqueValues(items.map((item) => item.market)),
    }))
  },
  async searchBuses(criteria) {
    await wait()
    const filteredBuses = buses
      .filter((bus) => {
        const route = bus.route.toLowerCase()
        const originMatch = criteria.origin
          ? route.includes(criteria.origin.toLowerCase())
          : true
        const destinationMatch = criteria.destination
          ? route.includes(criteria.destination.toLowerCase())
          : true
        return originMatch && destinationMatch
      })
      .filter((bus) => (criteria.market ? bus.market === criteria.market : true))

    return buildSearchEnvelope('buses', criteria, filteredBuses, (items) => ({
      operators: uniqueValues(items.map((item) => item.operator)).sort(),
      seatingTypes: uniqueValues(items.map((item) => item.seating)).sort(),
      priceRange: computeRange(items, (item) => item.price),
      travelWindow: computeIsoRange(items, (item) => item.departure),
      markets: uniqueValues(items.map((item) => item.market)),
    }))
  },
  async searchHolidays(criteria) {
    await wait()
    const filteredHolidays = holidays.filter((packageOption) => {
      const destinationMatch = criteria.destination
        ? packageOption.destination.toLowerCase().includes(criteria.destination.toLowerCase())
        : true
      const themeMatch = criteria.theme ? packageOption.theme === criteria.theme : true
      const budgetMatch = criteria.budget
        ? packageOption.pricePerPerson * criteria.travelers <= criteria.budget
        : true
      const marketMatch = criteria.market ? packageOption.market === criteria.market : true
      return destinationMatch && themeMatch && budgetMatch && marketMatch
    })

    return buildSearchEnvelope('holidays', criteria, filteredHolidays, (items) => ({
      themes: uniqueValues(items.map((item) => item.theme)).sort(),
      durations: uniqueValues(items.map((item) => item.duration)).sort(),
      priceRange: computeRange(items, (item) => item.pricePerPerson),
      markets: uniqueValues(items.map((item) => item.market)),
    }))
  },
  async getFlightById(id) {
    await wait(200)
    return flights.find((flight) => flight.id === id)
  },
  async getHotelById(id) {
    await wait(200)
    return hotels.find((hotel) => hotel.id === id)
  },
  async getBusById(id) {
    await wait(200)
    return buses.find((bus) => bus.id === id)
  },
  async getHolidayById(id) {
    await wait(200)
    return holidays.find((packageOption) => packageOption.id === id)
  },
}

export const mockApi = runtimeConfig.useMocks ? mockApiImpl : backendApi
export const usingMockData = runtimeConfig.useMocks
