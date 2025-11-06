const domesticDestinations = [
  { name: 'Backwaters of Alleppey', region: 'Kerala', theme: 'Wellness escapes' },
  { name: 'Royal Rajasthan Circuit', region: 'Rajasthan', theme: 'Culture & heritage' },
  { name: 'Himalayan Monasteries', region: 'Sikkim', theme: 'Spiritual journeys' },
  { name: 'Coffee Trails of Coorg', region: 'Karnataka', theme: 'Nature retreats' },
  { name: 'Island Life in Havelock', region: 'Andaman & Nicobar', theme: 'Beach escapes' },
  { name: 'Valley of Flowers Trek', region: 'Uttarakhand', theme: 'Adventure quests' },
  { name: 'Temple Town Kanchipuram', region: 'Tamil Nadu', theme: 'Culture & heritage' },
  { name: 'Tea Estates of Darjeeling', region: 'West Bengal', theme: 'Nature retreats' },
  { name: 'Desert Dunes of Jaisalmer', region: 'Rajasthan', theme: 'Family adventures' },
  { name: 'Houseboats of Kumarakom', region: 'Kerala', theme: 'Romantic retreats' },
  { name: 'Vineyards of Nashik', region: 'Maharashtra', theme: 'Gourmet getaways' },
  { name: 'Meghalaya Living Roots', region: 'Meghalaya', theme: 'Adventure quests' },
  { name: 'Zanskar Glacier Traverse', region: 'Ladakh', theme: 'Epic expeditions' },
]

const internationalDestinations = [
  { name: 'Bali Island Circuit', region: 'Indonesia', theme: 'Wellness escapes' },
  { name: 'Swiss Alps Retreat', region: 'Switzerland', theme: 'Adventure quests' },
  { name: 'Kyoto Culture Trail', region: 'Japan', theme: 'Culture & heritage' },
  { name: 'Santorini Sunsets', region: 'Greece', theme: 'Romantic retreats' },
  { name: 'Marrakesh Souk Discovery', region: 'Morocco', theme: 'Gourmet getaways' },
  { name: 'New Zealand Self-Drive', region: 'New Zealand', theme: 'Epic expeditions' },
  { name: 'Canadian Rockies Explorer', region: 'Canada', theme: 'Nature retreats' },
  { name: 'Turkish Riviera Blue Voyage', region: 'Turkey', theme: 'Beach escapes' },
]

const durationOptions = ['3 nights / 4 days', '4 nights / 5 days', '5 nights / 6 days', '6 nights / 7 days', '7 nights / 8 days']
const travelerOptions = [2, 4, 6]
const highlightPool = [
  'Private guided tour',
  'Boutique stay upgrade',
  'Sunrise experience',
  'Culinary masterclass',
  'Heritage walk',
  'Wellness ritual',
  'Exclusive ferry',
  'Local storytelling session',
  'Jeep safari',
  'Stargazing soiree',
  'Backwater cruise',
  'Tea tasting',
  'Village immersion',
]

const holidays = Array.from({ length: 120 }, (_, index) => {
  const isInternational = index % 5 === 0
  const destinationPool = isInternational ? internationalDestinations : domesticDestinations
  const destination = destinationPool[index % destinationPool.length]
  const duration = durationOptions[index % durationOptions.length]
  const travelersIncluded = travelerOptions[index % travelerOptions.length]
  const basePrice = 18500 + (index % 20) * 1250
  const perPerson = (isInternational ? basePrice * 1.65 : basePrice) + (travelersIncluded > 2 ? 1500 : 0)
  const highlights = Array.from({ length: 4 }, (_, highlightIndex) =>
    highlightPool[(index + highlightIndex) % highlightPool.length]
  )

  return {
    id: `${isInternational ? 'HL-INT' : 'HL-IN'}-${4001 + index}`,
    name: `${destination.name} by VyuGo`,
    destination: `${destination.name}, ${destination.region}`,
    theme: destination.theme,
    duration,
    pricePerPerson: perPerson,
    travelersIncluded,
    highlights,
    description: `Immerse yourself in ${destination.name.toLowerCase()} with handpicked stays, local experts, and door-to-door travel support managed by the VyuGo Holidays concierge desk.`,
    market: isInternational ? 'International' : 'Domestic',
    gallery: Array.from({ length: 4 }, (_, imageIndex) =>
      `https://images.vyugo.in/holidays/${isInternational ? 'intl' : 'in'}/${4001 + index}-${imageIndex + 1}.jpg`
    ),
  }
})

export default holidays
