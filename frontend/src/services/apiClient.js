import { runtimeConfig } from './environment'

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

export const apiClient = {
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
