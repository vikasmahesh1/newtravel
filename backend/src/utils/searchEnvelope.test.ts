import test from 'node:test'
import assert from 'node:assert/strict'

import { buildSearchEnvelope } from './searchEnvelope.ts'

test('buildSearchEnvelope builds metadata with defaults', () => {
  const envelope = buildSearchEnvelope(
    'flights',
    { origin: 'DEL', destination: 'BOM' },
    [
      { id: '1', price: 1200 },
      { id: '2', price: 1500 },
    ],
    () => ({ extra: true })
  )

  assert.equal(envelope.meta.total, 2)
  assert.equal(envelope.meta.currency, 'INR')
  assert.equal(envelope.meta.generatedAt, '2024-05-01T09:00:00.000Z')
  assert.equal(envelope.meta.source, 'api')
  assert.equal(envelope.meta.extra, true)
})
