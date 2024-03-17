import { describe, expect, it } from 'vitest'
import { nullable } from '../jsonschema.js'

// Test JSON Schema output (JTD-compatible subset)

describe('JSON Schema support', () => {
  it('should create nullable boolean types', () => {
    expect(nullable.boolean()).toEqual({ type: ['boolean', 'null'] })
    expect(nullable.boolean({ title: 'flag' })).toEqual({
      type: ['boolean', 'null'],
      metadata: {
        title: 'flag',
      },
    })
  })

  it('should create nullable string types', () => {
    expect(nullable.string()).toEqual({ type: ['string', 'null'] })
    expect(nullable.string({ info: 'Information' })).toEqual({
      type: ['string', 'null'],
      metadata: {
        info: 'Information',
      },
    })
  })

  it('should create nullable timestamp types', () => {
    expect(nullable.timestamp()).toEqual({
      type: ['string', 'null'],
      format: 'date-time',
    })
  })

  it('should create nullable number types', () => {
    // Aliases
    expect(nullable.number()).toEqual({ type: ['number', 'null'] })
    expect(nullable.integer()).toEqual({ type: ['integer', 'null'] })
    // JTD types
    expect(nullable.float32()).toEqual({ type: ['number', 'null'] })
    expect(nullable.float64()).toEqual({ type: ['number', 'null'] })
    expect(nullable.int8()).toEqual({ type: ['integer', 'null'] })
    expect(nullable.uint8()).toEqual({ type: ['integer', 'null'] })
    expect(nullable.int16()).toEqual({ type: ['integer', 'null'] })
    expect(nullable.uint16()).toEqual({ type: ['integer', 'null'] })
    expect(nullable.int32()).toEqual({ type: ['integer', 'null'] })
    expect(nullable.uint32()).toEqual({ type: ['integer', 'null'] })
  })

  it('should create nullable enum types', () => {
    expect(nullable.values(['A', 'B', 'C'])).toEqual({
      type: ['string', 'null'],
      enum: ['A', 'B', 'C'],
    })
  })

  it('should create nullable elements form (arrays)', () => {
    expect(nullable.array(nullable.string())).toEqual({
      type: ['array', 'null'],
      items: { type: ['string', 'null'] },
    })
  })

  it('should create nullable properties form (objects)', () => {
    expect(
      nullable.object({
        propertyA: nullable.string(),
        propertyB: nullable.object({
          innerPropertyC: nullable.float64(),
        }),
      }),
    ).toEqual({
      additionalProperties: true,
      type: ['object', 'null'],
      properties: {
        propertyA: { type: ['string', 'null'] },
        propertyB: {
          type: ['object', 'null'],
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: ['number', 'null'] },
          },
          required: ['innerPropertyC'],
        },
      },
      required: ['propertyA', 'propertyB'],
    })
  })

  it('should create nullable optional properties', () => {
    expect(
      nullable.object(
        {
          propertyA: nullable.string(),
          propertyB: nullable.object({
            innerPropertyC: nullable.float64(),
          }),
        },
        {
          propertyC: { type: ['string', 'null'] },
        },
        {
          metadataProperty: 'metatada',
        },
      ),
    ).toEqual({
      type: ['object', 'null'],
      additionalProperties: true,
      properties: {
        propertyA: { type: ['string', 'null'] },
        propertyB: {
          type: ['object', 'null'],
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: ['number', 'null'] },
          },
          required: ['innerPropertyC'],
        },
        propertyC: { type: ['string', 'null'] },
      },
      required: ['propertyA', 'propertyB'],
      metadata: {
        metadataProperty: 'metatada',
      },
    })
  })

  it('should not create required properties when there are none', () => {
    expect(
      nullable.object(null, {
        propertyA: nullable.string(),
        propertyB: nullable.object({
          innerPropertyC: nullable.float64(),
        }),
      }),
    ).toEqual({
      type: ['object', 'null'],
      additionalProperties: true,
      properties: {
        propertyA: { type: ['string', 'null'] },
        propertyB: {
          type: ['object', 'null'],
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: ['number', 'null'] },
          },
          required: ['innerPropertyC'],
        },
      },
    })
  })

  it('should create nullable objects with no allowed additional properties', () => {
    expect(
      nullable.sealed(null, {
        propertyA: nullable.string(),
        propertyB: nullable.object({
          innerPropertyC: nullable.float64(),
        }),
      }),
    ).toEqual({
      type: ['object', 'null'],
      additionalProperties: false,
      properties: {
        propertyA: { type: ['string', 'null'] },
        propertyB: {
          type: ['object', 'null'],
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: ['number', 'null'] },
          },
          required: ['innerPropertyC'],
        },
      },
    })
  })
})
