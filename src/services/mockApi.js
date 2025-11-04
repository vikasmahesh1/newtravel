import flights from '../data/flights.js'
import hotels from '../data/hotels.js'
import buses from '../data/buses.js'
import { runtimeConfig } from './environment'

const wait = (delay = 400) => new Promise((resolve) => setTimeout(resolve, delay))

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
}

const mockApiImpl = {
  async searchFlights(criteria) {
    await wait()
    return flights
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
  },
  async searchHotels(criteria) {
    await wait()
    return hotels.filter((hotel) =>
      criteria.destination
        ? hotel.location.toLowerCase().includes(criteria.destination.toLowerCase())
        : true
    )
  },
  async searchBuses(criteria) {
    await wait()
    return buses.filter((bus) => {
      const route = bus.route.toLowerCase()
      const originMatch = criteria.origin
        ? route.includes(criteria.origin.toLowerCase())
        : true
      const destinationMatch = criteria.destination
        ? route.includes(criteria.destination.toLowerCase())
        : true
      return originMatch && destinationMatch
    })
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
}

export const mockApi = runtimeConfig.useMocks ? mockApiImpl : backendApi
export const usingMockData = runtimeConfig.useMocks
