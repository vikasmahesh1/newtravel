import flights from '../data/flights.js'
import hotels from '../data/hotels.js'
import buses from '../data/buses.js'

const wait = (delay = 400) => new Promise((resolve) => setTimeout(resolve, delay))

export const mockApi = {
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
