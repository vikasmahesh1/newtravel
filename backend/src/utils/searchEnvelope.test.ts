import { describe, expect, it } from 'vitest'

import { buildSearchEnvelope } from './searchEnvelope'

describe('buildSearchEnvelope', () => {
  it('builds metadata with defaults', () => {
    const envelope = buildSearchEnvelope(
      'flights',
      { origin: 'DEL', destination: 'BOM' },
      [
        { id: '1', price: 1200 },
        { id: '2', price: 1500 },
      ],
      () => ({ extra: true })
    )

    expect(envelope.meta.total).toBe(2)
    expect(envelope.meta.currency).toBe('INR')
    expect(envelope.meta.generatedAt).toBe('2024-05-01T09:00:00.000Z')
    expect(envelope.meta.source).toBe('api')
    expect(envelope.meta.extra).toBe(true)
  })
})
