import { describe, expect, it } from 'vitest'
import schema from '../jsonschema.js'

// Test JSON Schema output (JTD-compatible subset)

describe('JSON Schema support', () => {
  it('should create empty form', () => {
    expect(schema.empty()).toEqual({})
  })

  it('should create boolean types', () => {
    expect(schema.boolean()).toEqual({ type: 'boolean' })
    expect(schema.boolean({ title: 'flag' })).toEqual({
      type: 'boolean',
      metadata: {
        title: 'flag',
      },
    })
  })

  it('should create string types', () => {
    expect(schema.string()).toEqual({ type: 'string' })
    expect(schema.string({ info: 'Information' })).toEqual({
      type: 'string',
      metadata: {
        info: 'Information',
      },
    })
  })

  it('should create timestamp types', () => {
    expect(schema.timestamp()).toEqual({ type: 'string', format: 'date-time' })
  })

  it('should create number types', () => {
    // Aliases
    expect(schema.number()).toEqual({ type: 'number' })
    expect(schema.integer()).toEqual({ type: 'integer' })
    // JTD types
    expect(schema.float32()).toEqual({ type: 'number' })
    expect(schema.float64()).toEqual({ type: 'number' })
    expect(schema.int8()).toEqual({ type: 'integer' })
    expect(schema.uint8()).toEqual({ type: 'integer' })
    expect(schema.int16()).toEqual({ type: 'integer' })
    expect(schema.uint16()).toEqual({ type: 'integer' })
    expect(schema.int32()).toEqual({ type: 'integer' })
    expect(schema.uint32()).toEqual({ type: 'integer' })
  })

  it('should create enum types', () => {
    expect(schema.values(['A', 'B', 'C'])).toEqual({
      type: 'string',
      enum: ['A', 'B', 'C'],
    })
  })

  it('should create elements form (arrays)', () => {
    expect(schema.array(schema.string())).toEqual({
      type: 'array',
      items: { type: 'string' },
    })
  })

  it('should create properties form (objects)', () => {
    expect(
      schema.object({
        propertyA: schema.string(),
        propertyB: schema.object({
          innerPropertyC: schema.float64(),
        }),
      }),
    ).toEqual({
      additionalProperties: true,
      type: 'object',
      properties: {
        propertyA: { type: 'string' },
        propertyB: {
          type: 'object',
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: 'number' },
          },
          required: ['innerPropertyC'],
        },
      },
      required: ['propertyA', 'propertyB'],
    })
  })

  it('should create optional properties', () => {
    expect(
      schema.object(
        {
          propertyA: schema.string(),
          propertyB: schema.object({
            innerPropertyC: schema.float64(),
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
      type: 'object',
      additionalProperties: true,
      properties: {
        propertyA: { type: 'string' },
        propertyB: {
          type: 'object',
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: 'number' },
          },
          required: ['innerPropertyC'],
        },
        propertyC: { type: 'string' },
      },
      required: ['propertyA', 'propertyB'],
      metadata: {
        metadataProperty: 'metatada',
      },
    })
  })

  it('should not create required properties when there are none', () => {
    expect(
      schema.object(null, {
        propertyA: schema.string(),
        propertyB: schema.object({
          innerPropertyC: schema.float64(),
        }),
      }),
    ).toEqual({
      type: 'object',
      additionalProperties: true,
      properties: {
        propertyA: { type: 'string' },
        propertyB: {
          type: 'object',
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: 'number' },
          },
          required: ['innerPropertyC'],
        },
      },
    })
  })

  it('should create objects with no allowed additional properties', () => {
    expect(
      schema.sealed(null, {
        propertyA: schema.string(),
        propertyB: schema.object({
          innerPropertyC: schema.float64(),
        }),
      }),
    ).toEqual({
      type: 'object',
      additionalProperties: false,
      properties: {
        propertyA: { type: 'string' },
        propertyB: {
          type: 'object',
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: 'number' },
          },
          required: ['innerPropertyC'],
        },
      },
    })
  })
})
