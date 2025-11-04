import { DEFAULT_CURRENCY, SAMPLE_GENERATED_AT, SEARCH_SCHEMAS } from './constants.js'

export const flightSearchContract = {
  schema: SEARCH_SCHEMAS.flights,
  request: {
    origin: 'DEL',
    destination: 'CCU',
    date: '2024-05-01',
    passengers: 1,
    cabin: 'Economy',
  },
  response: {
    criteria: {
      origin: 'DEL',
      destination: 'CCU',
      date: '2024-05-01',
      passengers: 1,
      cabin: 'Economy',
    },
    items: [
      {
        id: 'FL-IN-1001',
        airline: 'VyuGo Air',
        from: 'Delhi (DEL)',
        to: 'Kolkata (CCU)',
        departure: '2024-05-01T01:00:00.000Z',
        arrival: '2024-05-01T02:15:00.000Z',
        duration: '1h 15m',
        stops: 0,
        price: 3250,
        fareClass: 'Economy Flex',
        amenities: ['Hot meals', 'Priority check-in', 'Extra legroom'],
      },
      {
        id: 'FL-IN-1002',
        airline: 'IndiFly Connect',
        from: 'Mumbai (BOM)',
        to: 'Goa (GOX)',
        departure: '2024-05-01T02:30:00.000Z',
        arrival: '2024-05-01T04:05:00.000Z',
        duration: '1h 35m',
        stops: 0,
        price: 3570,
        fareClass: 'Premium Economy',
        amenities: ['Priority check-in', 'Extra legroom', 'In-seat power'],
      },
    ],
    meta: {
      total: 120,
      currency: DEFAULT_CURRENCY,
      generatedAt: SAMPLE_GENERATED_AT,
      source: 'mock-data',
      airlines: ['VyuGo Air', 'IndiFly Connect', 'Saffron Skies', 'AzureWings', 'Deccan Jet', 'SkyRaga Airlines'],
      fareClasses: ['Economy Flex', 'Premium Economy', 'First Elite', 'Business Saver'],
      stopOptions: [0, 1],
      priceRange: { min: 2800, max: 9330 },
      travelDates: {
        start: '2024-05-01T01:00:00.000Z',
        end: '2024-05-10T15:30:00.000Z',
      },
    },
  },
}

export const hotelSearchContract = {
  schema: SEARCH_SCHEMAS.hotels,
  request: {
    destination: 'Udaipur',
    checkIn: '2024-05-10',
    checkOut: '2024-05-12',
    guests: 2,
    rooms: 1,
  },
  response: {
    criteria: {
      destination: 'Udaipur',
      checkIn: '2024-05-10',
      checkOut: '2024-05-12',
      guests: 2,
      rooms: 1,
    },
    items: [
      {
        id: 'HT-IN-2001',
        name: 'Serene Udaipur Retreat',
        location: 'Udaipur, Rajasthan',
        pricePerNight: 4200,
        rating: 4.2,
        amenities: ['Infinity pool', 'Ayurvedic spa', 'Private butler', 'Lake cruise'],
        images: ['https://images.vyugo.in/hotels/2001.jpg'],
        description:
          'Escape to Udaipur with bespoke experiences curated by VyuGo concierges, blending local culture with modern indulgence.',
      },
      {
        id: 'HT-IN-2002',
        name: 'Heritage Kumarakom Haveli',
        location: 'Kumarakom, Kerala',
        pricePerNight: 4580,
        rating: 4.3,
        amenities: ['Ayurvedic spa', 'Private butler', 'Lake cruise', 'Heritage walk'],
        images: ['https://images.vyugo.in/hotels/2002.jpg'],
        description:
          'Escape to Kumarakom with bespoke experiences curated by VyuGo concierges, blending local culture with modern indulgence.',
      },
    ],
    meta: {
      total: 120,
      currency: DEFAULT_CURRENCY,
      generatedAt: SAMPLE_GENERATED_AT,
      source: 'mock-data',
      starRatings: [4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.2],
      amenityHighlights: [
        'Ayurvedic spa',
        'Complimentary hi-tea',
        'Curated excursions',
        'Heritage walk',
        'Infinity pool',
        'Lake cruise',
        'Organic dining',
        'Private butler',
        'Sunset terrace',
        'Yoga pavilion',
      ],
      priceRange: { min: 4200, max: 12940 },
    },
  },
}

export const busSearchContract = {
  schema: SEARCH_SCHEMAS.buses,
  request: {
    origin: 'Hyderabad',
    destination: 'Vijayawada',
    date: '2024-06-01',
    passengers: 2,
  },
  response: {
    criteria: {
      origin: 'Hyderabad',
      destination: 'Vijayawada',
      date: '2024-06-01',
      passengers: 2,
    },
    items: [
      {
        id: 'BS-IN-3001',
        operator: 'VyuGo Roadlink',
        route: 'Hyderabad ➜ Vijayawada',
        departure: '2024-06-01T15:00:00.000Z',
        arrival: '2024-06-01T21:12:00.000Z',
        duration: '6.2h',
        price: 1394,
        amenities: ['Wi-Fi', 'Snacks', 'On-board restroom'],
        seating: 'Recliner',
        description:
          'Premium road journey between Hyderabad and Vijayawada with curated stops and VyuGo concierge assistance.',
      },
      {
        id: 'BS-IN-3002',
        operator: 'Southern Star Travels',
        route: 'Bengaluru ➜ Chikkamagaluru',
        departure: '2024-06-01T17:15:00.000Z',
        arrival: '2024-06-01T23:00:00.000Z',
        duration: '5.8h',
        price: 1375,
        amenities: ['Snacks', 'On-board restroom', 'USB ports'],
        seating: 'Luxury coach',
        description:
          'Premium road journey between Bengaluru and Chikkamagaluru with curated stops and VyuGo concierge assistance.',
      },
    ],
    meta: {
      total: 120,
      currency: DEFAULT_CURRENCY,
      generatedAt: SAMPLE_GENERATED_AT,
      source: 'mock-data',
      operators: [
        'Eastern Vista Tours',
        'Konkan Cruiser',
        'Pravasi Comfort Lines',
        'Royal Deccan Coaches',
        'Southern Star Travels',
        'VyuGo Roadlink',
      ],
      seatingTypes: ['Business class', 'Luxury coach', 'Recliner', 'Sleeper', 'Standard AC'],
      priceRange: { min: 1165, max: 2345 },
      travelWindow: {
        start: '2024-06-01T15:00:00.000Z',
        end: '2024-06-10T01:45:00.000Z',
      },
    },
  },
}

export const holidaySearchContract = {
  schema: SEARCH_SCHEMAS.holidays,
  request: {
    destination: 'Kerala',
    theme: 'Wellness escapes',
    travelers: 2,
    budget: 150000,
    startDate: '2024-07-01',
    endDate: '2024-07-08',
  },
  response: {
    criteria: {
      destination: 'Kerala',
      theme: 'Wellness escapes',
      travelers: 2,
      budget: 150000,
      startDate: '2024-07-01',
      endDate: '2024-07-08',
    },
    items: [
      {
        id: 'HL-IN-4001',
        name: 'Backwaters of Alleppey by VyuGo',
        destination: 'Backwaters of Alleppey, Kerala',
        theme: 'Wellness escapes',
        duration: '3 nights / 4 days',
        pricePerPerson: 18500,
        travelersIncluded: 2,
        highlights: [
          'Private guided tour',
          'Boutique stay upgrade',
          'Sunrise experience',
          'Culinary masterclass',
        ],
        description:
          'Immerse yourself in backwaters of alleppey with handpicked stays, local experts, and door-to-door travel support managed by the VyuGo Holidays concierge desk.',
      },
      {
        id: 'HL-IN-4002',
        name: 'Royal Rajasthan Circuit by VyuGo',
        destination: 'Royal Rajasthan Circuit, Rajasthan',
        theme: 'Culture & heritage',
        duration: '4 nights / 5 days',
        pricePerPerson: 21250,
        travelersIncluded: 4,
        highlights: [
          'Boutique stay upgrade',
          'Sunrise experience',
          'Culinary masterclass',
          'Heritage walk',
        ],
        description:
          'Immerse yourself in royal rajasthan circuit with handpicked stays, local experts, and door-to-door travel support managed by the VyuGo Holidays concierge desk.',
      },
    ],
    meta: {
      total: 120,
      currency: DEFAULT_CURRENCY,
      generatedAt: SAMPLE_GENERATED_AT,
      source: 'mock-data',
      themes: [
        'Adventure quests',
        'Beach escapes',
        'Culture & heritage',
        'Epic expeditions',
        'Family adventures',
        'Gourmet getaways',
        'Nature retreats',
        'Romantic retreats',
        'Spiritual journeys',
        'Wellness escapes',
      ],
      durations: [
        '3 nights / 4 days',
        '4 nights / 5 days',
        '5 nights / 6 days',
        '6 nights / 7 days',
        '7 nights / 8 days',
      ],
      priceRange: { min: 18500, max: 43750 },
    },
  },
}

export const dataContracts = {
  flights: flightSearchContract,
  hotels: hotelSearchContract,
  buses: busSearchContract,
  holidays: holidaySearchContract,
}
