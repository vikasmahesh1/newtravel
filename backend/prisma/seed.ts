import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { buildBusSeeds } from './seed-data/buses'
import { buildFlightSeeds } from './seed-data/flights'
import { buildHolidaySeeds } from './seed-data/holidays'
import { buildHotelSeeds } from './seed-data/hotels'
import { userSeeds } from './seed-data/users'

const prisma = new PrismaClient()

async function main() {
  await prisma.busRoute.deleteMany()
  await prisma.flight.deleteMany()
  await prisma.holidayPackage.deleteMany()
  await prisma.hotel.deleteMany()
  await prisma.user.deleteMany()

  const flights = buildFlightSeeds()
  await prisma.flight.createMany({
    data: flights.map((flight) => ({
      ...flight,
      departure: new Date(flight.departure),
      arrival: new Date(flight.arrival),
    })),
  })

  const hotels = buildHotelSeeds()
  await prisma.hotel.createMany({ data: hotels })

  const buses = buildBusSeeds()
  await prisma.busRoute.createMany({
    data: buses.map((bus) => ({
      ...bus,
      departure: new Date(bus.departure),
      arrival: new Date(bus.arrival),
    })),
  })

  const holidays = buildHolidaySeeds()
  await prisma.holidayPackage.createMany({ data: holidays })

  for (const user of userSeeds) {
    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: await bcrypt.hash(user.password, 10),
        tier: user.tier,
        role: user.role,
        points: user.points,
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
