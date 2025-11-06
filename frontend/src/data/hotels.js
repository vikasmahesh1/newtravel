const domesticDestinations = [
  { city: 'Udaipur', state: 'Rajasthan' },
  { city: 'Kumarakom', state: 'Kerala' },
  { city: 'Gangtok', state: 'Sikkim' },
  { city: 'Jaipur', state: 'Rajasthan' },
  { city: 'Hampi', state: 'Karnataka' },
  { city: 'Darjeeling', state: 'West Bengal' },
  { city: 'Mahabalipuram', state: 'Tamil Nadu' },
  { city: 'Munnar', state: 'Kerala' },
  { city: 'Coorg', state: 'Karnataka' },
  { city: 'Leh', state: 'Ladakh' },
  { city: 'Jaisalmer', state: 'Rajasthan' },
  { city: 'Kodaikanal', state: 'Tamil Nadu' },
]

const internationalDestinations = [
  { city: 'Bali', state: 'Indonesia' },
  { city: 'Phuket', state: 'Thailand' },
  { city: 'Kyoto', state: 'Japan' },
  { city: 'Lucerne', state: 'Switzerland' },
  { city: 'Santorini', state: 'Greece' },
  { city: 'Queenstown', state: 'New Zealand' },
  { city: 'Dubai', state: 'UAE' },
  { city: 'Doha', state: 'Qatar' },
  { city: 'Cape Town', state: 'South Africa' },
  { city: 'Reykjavík', state: 'Iceland' },
]

const propertyStyles = ['Retreat', 'Haveli', 'Boutique', 'Palace', 'Residency', 'Sanctuary']
const descriptors = ['Serene', 'Heritage', 'Royal', 'Lakeview', 'Cliffside', 'Rainforest', 'Tea Estate', 'Desert', 'Seaside']
const amenitiesPool = [
  'Infinity pool',
  'Ayurvedic spa',
  'Private butler',
  'Lake cruise',
  'Heritage walk',
  'Organic dining',
  'Yoga pavilion',
  'Sunset terrace',
  'Curated excursions',
  'Complimentary hi-tea',
]

const hotels = Array.from({ length: 120 }, (_, index) => {
  const isInternational = index % 6 === 0
  const destinationPool = isInternational ? internationalDestinations : domesticDestinations
  const destination = destinationPool[index % destinationPool.length]
  const descriptor = descriptors[index % descriptors.length]
  const propertyStyle = propertyStyles[index % propertyStyles.length]
  const basePrice = 4200 + (index % 24) * 380
  const rating = Number((4 + ((index % 10) + 2) / 10).toFixed(1))
  const amenities = Array.from({ length: 4 }, (_, amenityIndex) =>
    amenitiesPool[(index + amenityIndex) % amenitiesPool.length]
  )
  const gallery = Array.from({ length: 4 }, (_, imageIndex) =>
    `https://images.vyugo.in/hotels/${isInternational ? 'intl' : 'in'}/${2001 + index}-${imageIndex + 1}.jpg`
  )

  return {
    id: `${isInternational ? 'HT-INT' : 'HT-IN'}-${2001 + index}`,
    name: `${descriptor} ${destination.city} ${propertyStyle}`,
    location: `${destination.city}, ${destination.state}`,
    pricePerNight: isInternational ? Math.round(basePrice * 1.55) : basePrice,
    rating,
    amenities,
    market: isInternational ? 'International' : 'Domestic',
    images: gallery,
    gallery,
    description: `Escape to ${destination.city} with bespoke experiences curated by VyuGo concierges, blending local culture with modern indulgence.`,
  }
})

export default hotels
