import { describe, it, test, expect } from 'vitest'

const {
  // Nullable Types
  nullable,
  // Regular Types
  object, // Object with additional properties allowed
  sealed, // Object with no additional properties allowed
} = require('../index.js')

// Test regular JSON Type Definition output
describe('RFC 8927 support (nullable helper)', () => {
  it('should create nullable boolean types', () => {
    expect(nullable.boolean()).toEqual({ type: 'boolean', nullable: true })
    expect(nullable.boolean({ title: 'flag' })).toEqual({
      type: 'boolean',
      nullable: true,
      metadata: {
        title: 'flag'
      }
    })
  })

  it('should create nullable string types', () => {
    expect(nullable.string()).toEqual({ type: 'string', nullable: true, })
    expect(nullable.string({ info: 'Information' })).toEqual({
      type: 'string',
      nullable: true,
      metadata: {
        info: 'Information'
      }
    })
  })

  it('should create nullable timestamp types', () => {
    expect(nullable.timestamp()).toEqual({ type: 'timestamp', nullable: true, })
  })

  it('should create nullable number types', () => {
    // Aliases
    expect(nullable.number()).toEqual({ type: 'float64', nullable: true, })
    expect(nullable.integer()).toEqual({ type: 'float64', nullable: true, })
    // JTD types
    expect(nullable.float32()).toEqual({ type: 'float32', nullable: true, })
    expect(nullable.float64()).toEqual({ type: 'float64', nullable: true, })
    expect(nullable.int8()).toEqual({ type: 'int8', nullable: true, })
    expect(nullable.uint8()).toEqual({ type: 'uint8', nullable: true, })
    expect(nullable.int16()).toEqual({ type: 'int16', nullable: true, })
    expect(nullable.uint16()).toEqual({ type: 'uint16', nullable: true, })
    expect(nullable.int32()).toEqual({ type: 'int32', nullable: true, })
    expect(nullable.uint32()).toEqual({ type: 'uint32', nullable: true, })
  })

  it('should create nullable enum types', () => {
    expect(nullable.values(['A', 'B', 'C'])).toEqual({ 
      enum: ['A', 'B', 'C'],
      nullable: true,
    })
  })

  it('should create nullable elements form (arrays)', () => {
    expect(nullable.array(nullable.string())).toEqual({ 
      elements: { type: 'string', nullable: true },
      nullable: true,
    })
  })

  it('should create nullable properties form (objects)', () => {
    expect(nullable.object({
      propertyA: nullable.string(),
      propertyB: object({
        innerPropertyC: nullable.float64()
      })
    })).toEqual({
      nullable: true,
      additionalProperties: true,
      properties: {
        propertyA: { type: 'string', nullable: true },
        propertyB: {
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: 'float64', nullable: true }
          }
        }
      }
    })
  })

  it('should create nullable optional properties', () => {
    expect(nullable.object({
      propertyA: nullable.string(),
      propertyB: object({
        innerPropertyC: nullable.float64()
      })
    }, {
      propertyC: nullable.string()
    }, {
      metadataProperty: 'metatada'
    })).toEqual({
      nullable: true,
      additionalProperties: true,
      properties: {
        propertyA: { type: 'string', nullable: true },
        propertyB: {
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: 'float64', nullable: true }
          }
        }
      },
      optionalProperties: {
        propertyC: { type: 'string', nullable: true }
      },
      metadata: {
        metadataProperty: 'metatada'
      }
    })
  })

  it('should not create required properties when there are none', () => {
    expect(object(null, {
      propertyA: nullable.string(),
      propertyB: object({
        innerPropertyC: nullable.float64()
      })
    })).toEqual({
      additionalProperties: true,
      optionalProperties: {
        propertyA: { type: 'string', nullable: true, },
        propertyB: {
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: 'float64', nullable: true, }
          }
        }
      }
    })
  })

  it('should create nullable objects with no allowed additional properties', () => {
    expect(nullable.sealed(null, {
      propertyA: nullable.string(),
      propertyB: object({
        innerPropertyC: nullable.float64()
      })
    })).toEqual({
      nullable: true,
      additionalProperties: false,
      optionalProperties: {
        propertyA: { type: 'string', nullable: true, },
        propertyB: {
          additionalProperties: true,
          properties: {
            innerPropertyC: { type: 'float64', nullable: true, }
          }
        }
      }
    })
  })
})
