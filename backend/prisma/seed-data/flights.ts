export type FlightSeed = {
  id: string
  airline: string
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  stops: number
  price: number
  fareClass: string
  amenities: string[]
  market: string
  region: string
}

const domesticCityMatrix = [
  { city: 'Delhi', code: 'DEL' },
  { city: 'Mumbai', code: 'BOM' },
  { city: 'Bengaluru', code: 'BLR' },
  { city: 'Hyderabad', code: 'HYD' },
  { city: 'Chennai', code: 'MAA' },
  { city: 'Kolkata', code: 'CCU' },
  { city: 'Ahmedabad', code: 'AMD' },
  { city: 'Pune', code: 'PNQ' },
  { city: 'Goa', code: 'GOX' },
  { city: 'Jaipur', code: 'JAI' },
  { city: 'Lucknow', code: 'LKO' },
  { city: 'Kochi', code: 'COK' },
]

const internationalDestinations = [
  { city: 'Singapore', code: 'SIN', region: 'Singapore' },
  { city: 'Dubai', code: 'DXB', region: 'UAE' },
  { city: 'Bangkok', code: 'BKK', region: 'Thailand' },
  { city: 'London', code: 'LHR', region: 'United Kingdom' },
  { city: 'New York', code: 'JFK', region: 'USA' },
  { city: 'Sydney', code: 'SYD', region: 'Australia' },
  { city: 'Paris', code: 'CDG', region: 'France' },
  { city: 'Tokyo', code: 'HND', region: 'Japan' },
  { city: 'Toronto', code: 'YYZ', region: 'Canada' },
  { city: 'Johannesburg', code: 'JNB', region: 'South Africa' },
]

const airlines = [
  'VyuGo Air',
  'IndiFly Connect',
  'Saffron Skies',
  'AzureWings',
  'Deccan Jet',
  'SkyRaga Airlines',
]

const fareClasses = ['Economy Flex', 'Premium Economy', 'Business Saver', 'First Elite']
const durationOptions = [75, 95, 110, 125, 140, 155, 170, 185]
const stopPattern = [0, 0, 1, 0, 1, 0]
const amenitiesPool = [
  'Hot meals',
  'Priority check-in',
  'Extra legroom',
  'In-seat power',
  'Wi-Fi',
  'Additional baggage',
  'Lounge access',
]

const minutesToDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

const baseDate = new Date(Date.UTC(2024, 4, 1, 1, 0))

export const buildFlightSeeds = (): FlightSeed[] => {
  return Array.from({ length: 160 }, (_, index) => {
    const isInternational = index % 4 === 0
    const origin = domesticCityMatrix[index % domesticCityMatrix.length]
    let destination
    if (isInternational) {
      destination = internationalDestinations[(index * 3) % internationalDestinations.length]
    } else {
      destination = domesticCityMatrix[(index * 3 + 5) % domesticCityMatrix.length]
      if (destination.code === origin.code) {
        destination = domesticCityMatrix[(index * 5 + 7) % domesticCityMatrix.length]
      }
    }

    const departure = new Date(baseDate)
    departure.setUTCDate(baseDate.getUTCDate() + Math.floor(index / domesticCityMatrix.length))
    departure.setUTCHours(1 + (index % 15), (index % 2) * 30)

    const duration = durationOptions[index % durationOptions.length]
    const arrival = new Date(departure)
    const durationBuffer = Math.round(isInternational ? duration * 1.8 : duration)
    arrival.setUTCMinutes(arrival.getUTCMinutes() + durationBuffer)

    const stops = stopPattern[index % stopPattern.length]
    const basePrice = 2800 + (index % 20) * 320
    const nonstopBonus = stops === 0 ? 450 : 0
    const price = Math.round((isInternational ? basePrice * 2.8 : basePrice) + nonstopBonus)

    const amenities = Array.from({ length: 3 }, (_, amenityIndex) =>
      amenitiesPool[(index + amenityIndex) % amenitiesPool.length]
    )

    return {
      id: `${isInternational ? 'FL-INT' : 'FL-IN'}-${1001 + index}`,
      airline: airlines[index % airlines.length],
      from: `${origin.city} (${origin.code})`,
      to: `${destination.city} (${destination.code})`,
      departure: departure.toISOString(),
      arrival: arrival.toISOString(),
      duration: minutesToDuration(durationBuffer),
      stops,
      price,
      fareClass: fareClasses[(index + stops) % fareClasses.length],
      amenities,
      market: isInternational ? 'International' : 'Domestic',
      region: isInternational ? destination.region : 'India',
    }
  })
}
