export type BusSeed = {
  id: string
  operator: string
  route: string
  departure: string
  arrival: string
  duration: string
  price: number
  amenities: string[]
  seating: string
  description: string
  market: string
}

const domesticCorridors = [
  { from: 'Hyderabad', to: 'Vijayawada', hours: 6.2 },
  { from: 'Bengaluru', to: 'Chikkamagaluru', hours: 5.5 },
  { from: 'Chennai', to: 'Puducherry', hours: 4.1 },
  { from: 'Mumbai', to: 'Goa', hours: 11.5 },
  { from: 'Delhi', to: 'Jaipur', hours: 5.8 },
  { from: 'Kolkata', to: 'Digha', hours: 4.7 },
  { from: 'Ahmedabad', to: 'Udaipur', hours: 8.2 },
  { from: 'Pune', to: 'Mahabaleshwar', hours: 4.3 },
  { from: 'Lucknow', to: 'Varanasi', hours: 7.0 },
  { from: 'Indore', to: 'Bhopal', hours: 4.0 },
  { from: 'Coimbatore', to: 'Ooty', hours: 5.2 },
  { from: 'Kochi', to: 'Munnar', hours: 5.5 },
]

const internationalCorridors = [
  { from: 'Delhi', to: 'Kathmandu (Nepal)', hours: 18.5 },
  { from: 'Kolkata', to: 'Dhaka (Bangladesh)', hours: 12.2 },
  { from: 'Imphal', to: 'Mandalay (Myanmar)', hours: 22.4 },
  { from: 'Varanasi', to: 'Lumbini (Nepal)', hours: 10.6 },
  { from: 'Agartala', to: 'Chittagong (Bangladesh)', hours: 13.1 },
  { from: 'Jaipur', to: 'Lahore (Pakistan)', hours: 16.4 },
]

const operators = [
  'VyuGo Roadlink',
  'Southern Star Travels',
  'Konkan Cruiser',
  'Royal Deccan Coaches',
  'Eastern Vista Tours',
  'Pravasi Comfort Lines',
]

const seatingTypes = ['Recliner', 'Luxury coach', 'Sleeper', 'Business class', 'Standard AC']
const amenitiesPool = ['Wi-Fi', 'Snacks', 'On-board restroom', 'USB ports', 'Neck pillows', 'Personal screens', 'Blankets']

const baseDate = new Date('2024-06-01T15:00:00+05:30')

export const buildBusSeeds = (): BusSeed[] => {
  return Array.from({ length: 140 }, (_, index) => {
    const isInternational = index % 7 === 0
    const corridorPool = isInternational ? internationalCorridors : domesticCorridors
    const corridor = corridorPool[index % corridorPool.length]
    const departure = new Date(baseDate)
    departure.setDate(baseDate.getDate() + Math.floor(index / domesticCorridors.length))
    departure.setHours(15 + (index % 6) * 2, (index % 3) * 15)

    const durationHours = corridor.hours + (index % 3) * 0.25
    const arrival = new Date(departure)
    arrival.setMinutes(arrival.getMinutes() + Math.round(durationHours * 60))

    const price = Math.round((isInternational ? 950 : 650) + durationHours * (isInternational ? 180 : 120) + (index % 10) * 35)
    const amenities = Array.from({ length: 3 }, (_, amenityIndex) =>
      amenitiesPool[(index + amenityIndex) % amenitiesPool.length]
    )

    return {
      id: `${isInternational ? 'BS-INT' : 'BS-IN'}-${3001 + index}`,
      operator: operators[index % operators.length],
      route: `${corridor.from} ➜ ${corridor.to}`,
      departure: departure.toISOString(),
      arrival: arrival.toISOString(),
      duration: `${durationHours.toFixed(1)}h`,
      price,
      amenities,
      seating: seatingTypes[index % seatingTypes.length],
      description: `Premium road journey between ${corridor.from} and ${corridor.to} with curated stops and VyuGo concierge assistance.`,
      market: isInternational ? 'International' : 'Domestic',
    }
  })
}
