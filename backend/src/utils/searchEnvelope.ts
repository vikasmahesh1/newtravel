import { DEFAULT_CURRENCY, SAMPLE_GENERATED_AT, SEARCH_SCHEMAS } from './constants.ts'
import type { SearchDomain } from './constants.ts'

export type NumericRange = {
  min: number
  max: number
}

export type IsoDateRange = {
  start: string
  end: string
}

export const uniqueValues = <T>(values: T[]) => Array.from(new Set(values))

export const computeRange = (items: number[]): NumericRange | null => {
  if (!items.length) return null
  return {
    min: Math.min(...items),
    max: Math.max(...items),
  }
}

export const computeIsoRange = (items: (string | Date)[]): IsoDateRange | null => {
  if (!items.length) return null
  const timestamps = items.map((item) => new Date(item).getTime())
  return {
    start: new Date(Math.min(...timestamps)).toISOString(),
    end: new Date(Math.max(...timestamps)).toISOString(),
  }
}

export type SearchEnvelope<TCriteria, TItem, TMeta extends Record<string, unknown>> = {
  schema: (typeof SEARCH_SCHEMAS)[SearchDomain]
  criteria: TCriteria
  items: TItem[]
  meta: {
    total: number
    currency: string
    generatedAt: string
    source: 'api'
  } & TMeta
}

export const buildSearchEnvelope = <TCriteria, TItem, TMeta extends Record<string, unknown>>(
  domain: SearchDomain,
  criteria: TCriteria,
  items: TItem[],
  metaFactory: (items: TItem[]) => TMeta
): SearchEnvelope<TCriteria, TItem, TMeta> => {
  return {
    schema: SEARCH_SCHEMAS[domain],
    criteria: { ...criteria },
    items,
    meta: {
      total: items.length,
      currency: DEFAULT_CURRENCY,
      generatedAt: SAMPLE_GENERATED_AT,
      source: 'api',
      ...metaFactory(items),
    },
  }
}
