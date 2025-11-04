const cityMatrix = [
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
const amenitiesPool = ['Hot meals', 'Priority check-in', 'Extra legroom', 'In-seat power', 'Wi-Fi', 'Additional baggage', 'Lounge access']

const minutesToDuration = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

const baseDate = new Date(Date.UTC(2024, 4, 1, 1, 0))

const flights = Array.from({ length: 120 }, (_, index) => {
  const origin = cityMatrix[index % cityMatrix.length]
  let destination = cityMatrix[(index * 3 + 5) % cityMatrix.length]
  if (destination.code === origin.code) {
    destination = cityMatrix[(index * 5 + 7) % cityMatrix.length]
  }

  const departure = new Date(baseDate)
  departure.setUTCDate(baseDate.getUTCDate() + Math.floor(index / cityMatrix.length))
  departure.setUTCHours(1 + (index % 15), (index % 2) * 30)

  const duration = durationOptions[index % durationOptions.length]
  const arrival = new Date(departure)
  arrival.setUTCMinutes(arrival.getUTCMinutes() + duration)

  const stops = stopPattern[index % stopPattern.length]
  const basePrice = 2800 + (index % 20) * 320
  const nonstopBonus = stops === 0 ? 450 : 0
  const price = basePrice + nonstopBonus

  const amenities = Array.from({ length: 3 }, (_, amenityIndex) =>
    amenitiesPool[(index + amenityIndex) % amenitiesPool.length]
  )

  return {
    id: `FL-IN-${1001 + index}`,
    airline: airlines[index % airlines.length],
    from: `${origin.city} (${origin.code})`,
    to: `${destination.city} (${destination.code})`,
    departure: departure.toISOString(),
    arrival: arrival.toISOString(),
    duration: minutesToDuration(duration),
    stops,
    price,
    fareClass: fareClasses[(index + stops) % fareClasses.length],
    amenities,
  }
})

export default flights
