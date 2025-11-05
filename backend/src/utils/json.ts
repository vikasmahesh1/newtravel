import { Prisma } from '@prisma/client'

export const asStringArray = (value: Prisma.JsonValue | null | undefined): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string')
  }
  if (value && typeof value === 'object') {
    // Handle Prisma.Decimal or nested JSON objects gracefully by returning []
    return []
  }
  return []
}
