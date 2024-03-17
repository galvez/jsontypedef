import { describe, expect, it } from 'vitest'

import {
  array,
  boolean,
  // Types
  empty,
  float32,
  float64,
  int8,
  int16,
  int32,
  integer, // Alias to float64 for convenience
  match, // Helper to define both `discriminator` and `mapping``
  number, // Alias to float64 for convenience
  object, // Object with additional properties allowed
  sealed, // Object with no additional properties allowed
  string,
  timestamp,
  uint8,
  uint16,
  uint32,
  values, // Alias to enum because that's a reserved keyword
} from '../index.js'

// Test regular JSON Type Definition output
describe('RFC 8927 support', () => {
  it('should create empty forms', () => {
    expect(empty()).toEqual({})
  })

  it('should create boolean types', () => {
    expect(boolean()).toEqual({ type: 'boolean' })
    expect(boolean({ title: 'flag' })).toEqual({
      type: 'boolean',
      metadata: {
        title: 'flag',
      },
    })
  })

  it('should create string types', () => {
    expect(string()).toEqual({ type: 'string' })
    expect(string({ info: 'Information' })).toEqual({
      type: 'string',
      metadata: {
        info: 'Information',
      },
    })
  })

  it('should create timestamp types', () => {
    expect(timestamp()).toEqual({ type: 'timestamp' })
  })

  it('should create number types', () => {
    // Aliases
    expect(number()).toEqual({ type: 'float64' })
    expect(integer()).toEqual({ type: 'float64' })
    // JTD types
    expect(float32()).toEqual({ type: 'float32' })
    expect(float64()).toEqual({ type: 'float64' })
    expect(int8()).toEqual({ type: 'int8' })
    expect(uint8()).toEqual({ type: 'uint8' })
    expect(int16()).toEqual({ type: 'int16' })
    expect(uint16()).toEqual({ type: 'uint16' })
    expect(int32()).toEqual({ type: 'int32' })
    expect(uint32()).toEqual({ type: 'uint32' })
  })

  it('should create enum types', () => {
    expect(values(['A', 'B', 'C'])).toEqual({ enum: ['A', 'B', 'C'] })
  })

  it('should create elements form (arrays)', () => {
    expect(array(string())).toEqual({ elements: { type: 'string' } })
  })

  it('should create properties form (objects)', () => {
    expect(
      object({
        propertyA: string(),
        propertyB: object({
          innerPropertyC: float64(),
        }),
      }),
    ).toEqual({
      additionalProperties: true,
      properties: {
        propertyA: { type: 'string' },
        propertyB: {
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: 'float64' },
          },
        },
      },
    })
  })

  it('should create optional properties', () => {
    expect(
      object(
        {
          propertyA: string(),
          propertyB: object({
            innerPropertyC: float64(),
          }),
        },
        {
          propertyC: { type: 'string' },
        },
        {
          metadataProperty: 'metatada',
        },
      ),
    ).toEqual({
      additionalProperties: true,
      properties: {
        propertyA: { type: 'string' },
        propertyB: {
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: 'float64' },
          },
        },
      },
      optionalProperties: {
        propertyC: { type: 'string' },
      },
      metadata: {
        metadataProperty: 'metatada',
      },
    })
  })

  it('should not create required properties when there are none', () => {
    expect(
      object(null, {
        propertyA: string(),
        propertyB: object({
          innerPropertyC: float64(),
        }),
      }),
    ).toEqual({
      additionalProperties: true,
      optionalProperties: {
        propertyA: { type: 'string' },
        propertyB: {
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: 'float64' },
          },
        },
      },
    })
  })

  it('should create objects with no allowed additional properties', () => {
    expect(
      sealed(null, {
        propertyA: string(),
        propertyB: object({
          innerPropertyC: float64(),
        }),
      }),
    ).toEqual({
      additionalProperties: false,
      optionalProperties: {
        propertyA: { type: 'string' },
        propertyB: {
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: 'float64' },
          },
        },
      },
    })
  })

  it('should create discriminator form (tagged unions)', () => {
    expect(
      match('event', {
        created: sealed({ when: timestamp() }),
        added: sealed({ when: timestamp(), what: string() }),
      }),
    ).toEqual({
      discriminator: 'event',
      mapping: {
        created: {
          additionalProperties: false,
          properties: {
            when: { type: 'timestamp' },
          },
        },
        added: {
          additionalProperties: false,
          properties: {
            when: { type: 'timestamp' },
            what: { type: 'string' },
          },
        },
      },
    })
  })
})
