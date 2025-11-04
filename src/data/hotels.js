const destinations = [
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
  const destination = destinations[index % destinations.length]
  const descriptor = descriptors[index % descriptors.length]
  const propertyStyle = propertyStyles[index % propertyStyles.length]
  const basePrice = 4200 + (index % 24) * 380
  const rating = Number((4 + ((index % 10) + 2) / 10).toFixed(1))
  const amenities = Array.from({ length: 4 }, (_, amenityIndex) =>
    amenitiesPool[(index + amenityIndex) % amenitiesPool.length]
  )

  return {
    id: `HT-IN-${2001 + index}`,
    name: `${descriptor} ${destination.city} ${propertyStyle}`,
    location: `${destination.city}, ${destination.state}`,
    pricePerNight: basePrice,
    rating,
    amenities,
    images: [`https://images.vyugo.in/hotels/${2001 + index}.jpg`],
    description: `Escape to ${destination.city} with bespoke experiences curated by VyuGo concierges, blending local culture with modern indulgence.`,
  }
})

export default hotels
