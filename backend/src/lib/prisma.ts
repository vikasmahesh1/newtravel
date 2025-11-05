import { PrismaClient } from '@prisma/client'

import { env } from '../config/env'

const createPrisma = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: env.databaseUrl,
      },
    },
  })
}

export const prisma = createPrisma()
