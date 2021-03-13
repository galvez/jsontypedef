'use strict'

const tap = require('tap')

const {
  schema,
  empty,
  boolean,
  string,
  timestamp,
  float32,
  float64,
  int8,
  uint8,
  int16,
  uint16,
  int32,
  uint32,
  values,
  array,
  object,
  match
} = require('./index')

// Test regular JSON Type Definition output
tap.strictSame(empty(), {})
tap.strictSame(boolean(), { type: 'boolean' })
tap.strictSame(string(), { type: 'string' })
tap.strictSame(timestamp(), { type: 'timestamp' })
tap.strictSame(float32(), { type: 'float32' })
tap.strictSame(float64(), { type: 'float64' })
tap.strictSame(int8(), { type: 'int8' })
tap.strictSame(uint8(), { type: 'uint8' })
tap.strictSame(int16(), { type: 'int16' })
tap.strictSame(uint16(), { type: 'uint16' })
tap.strictSame(int32(), { type: 'int32' })
tap.strictSame(uint32(), { type: 'uint32' })
tap.strictSame(values(['A', 'B', 'C']), { enum: ['A', 'B', 'C'] })
tap.strictSame(array(string()), { elements: { type: 'string' } })
tap.strictSame(object({
  propertyA: string(),
  propertyB: object({
    innerPropertyC: float64()
  })
}), {
  properties: {
    propertyA: { type: 'string' },
    propertyB: {
      properties: {
        innerPropertyC: { type: 'float64' }
      }
    }
  }
})
tap.strictSame(match('event', {
  created: { when: timestamp() },
  added: { when: timestamp(), what: string() }
}), {
  discriminator: 'event',
  mapping: {
    created: {
      properties: {
        when: { type: 'timestamp' }
      }
    },
    added: {
      properties: {
        when: { type: 'timestamp' },
        what: { type: 'string' }
      }
    }
  }
})

// Test JSON Schema output (JTD-compatible subset)
tap.strictSame(schema.empty(), {})
tap.strictSame(schema.boolean(), { type: 'boolean' })
tap.strictSame(schema.string(), { type: 'string' })
tap.strictSame(schema.timestamp(), { type: 'string', format: 'date-time' })
tap.strictSame(schema.float32(), { type: 'number' })
tap.strictSame(schema.float64(), { type: 'number' })
tap.strictSame(schema.int8(), { type: 'integer' })
tap.strictSame(schema.uint8(), { type: 'integer' })
tap.strictSame(schema.int16(), { type: 'integer' })
tap.strictSame(schema.uint16(), { type: 'integer' })
tap.strictSame(schema.int32(), { type: 'integer' })
tap.strictSame(schema.uint32(), { type: 'integer' })
tap.strictSame(schema.values(['A', 'B', 'C']), {
  type: 'string',
  enum: ['A', 'B', 'C']
})
tap.strictSame(schema.array(string()), {
  type: 'array',
  items: { type: 'string' }
})
tap.strictSame(schema.object({
  propertyA: schema.string(),
  propertyB: schema.object({
    innerPropertyC: schema.float64()
  })
}), {
  type: 'object',
  properties: {
    propertyA: { type: 'string' },
    propertyB: {
      type: 'object',
      properties: {
        innerPropertyC: { type: 'number' }
      },
      required: ['innerPropertyC'],
    }
  },
  required: ['propertyA', 'propertyB'],
})
