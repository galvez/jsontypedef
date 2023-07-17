'use strict'

const jsontypedef = {
  empty: (metadata) => ({
    ...metadata && { metadata }
  }),
  boolean: (metadata) => ({
    type: 'boolean',
    ...metadata && { metadata }
  }),
  string: (metadata) => ({
    type: 'string',
    ...metadata && { metadata }
  }),
  timestamp: (metadata) => ({
    type: 'timestamp',
    ...metadata && { metadata }
  }),
  number: (metadata) => ({
    type: 'float64',
    ...metadata && { metadata }
  }),
  integer: (metadata) => ({
    type: 'float64',
    ...metadata && { metadata }
  }),
  float32: (metadata) => ({
    type: 'float32',
    ...metadata && { metadata }
  }),
  float64: (metadata) => ({
    type: 'float64',
    ...metadata && { metadata }
  }),
  int8: (metadata) => ({
    type: 'int8',
    ...metadata && { metadata }
  }),
  uint8: (metadata) => ({
    type: 'uint8',
    ...metadata && { metadata }
  }),
  int16: (metadata) => ({
    type: 'int16',
    ...metadata && { metadata }
  }),
  uint16: (metadata) => ({
    type: 'uint16',
    ...metadata && { metadata }
  }),
  int32: (metadata) => ({
    type: 'int32',
    ...metadata && { metadata }
  }),
  uint32: (metadata) => ({
    type: 'uint32',
    ...metadata && { metadata }
  }),
  values: (items, metadata) => ({
    enum: items,
    ...metadata && { metadata }
  }),
  array: (type, metadata) => ({
    elements: type,
    ...metadata && { metadata }
  }),
  object: (props, optional, metadata) => ({
    additionalProperties: true,
    ...props && { properties: props },
    ...optional && { optionalProperties: optional },
    ...metadata && { metadata }
  }),
  sealed: (props, optional, metadata) => ({
    additionalProperties: false,
    ...props && { properties: props },
    ...optional && { optionalProperties: optional },
    ...metadata && { metadata }
  }),
  match: (field, mapping, metadata) => ({
    discriminator: field,
    mapping,
    ...metadata && { metadata }
  }),
  nullable: {
    boolean: (metadata) => ({
      nullable: true,
      type: 'boolean',
      ...metadata && { metadata }
    }),
    string: (metadata) => ({
      nullable: true,
      type: 'string',
      ...metadata && { metadata }
    }),
    timestamp: (metadata) => ({
      nullable: true,
      type: 'timestamp',
      ...metadata && { metadata }
    }),
    number: (metadata) => ({
      nullable: true,
      type: 'float64',
      ...metadata && { metadata }
    }),
    integer: (metadata) => ({
      nullable: true,
      type: 'float64',
      ...metadata && { metadata }
    }),
    float32: (metadata) => ({
      nullable: true,
      type: 'float32',
      ...metadata && { metadata }
    }),
    float64: (metadata) => ({
      nullable: true,
      type: 'float64',
      ...metadata && { metadata }
    }),
    int8: (metadata) => ({
      nullable: true,
      type: 'int8',
      ...metadata && { metadata }
    }),
    uint8: (metadata) => ({
      nullable: true,
      type: 'uint8',
      ...metadata && { metadata }
    }),
    int16: (metadata) => ({
      nullable: true,
      type: 'int16',
      ...metadata && { metadata }
    }),
    uint16: (metadata) => ({
      nullable: true,
      type: 'uint16',
      ...metadata && { metadata }
    }),
    int32: (metadata) => ({
      nullable: true,
      type: 'int32',
      ...metadata && { metadata }
    }),
    uint32: (metadata) => ({
      nullable: true,
      type: 'uint32',
      ...metadata && { metadata }
    }),
    values: (items, metadata) => ({
      nullable: true,
      enum: items,
      ...metadata && { metadata }
    }),
    array: (type, metadata) => ({
      nullable: true,
      elements: type,
      ...metadata && { metadata }
    }),
    object: (props, optional, metadata) => ({
      nullable: true,
      additionalProperties: true,
      ...props && { properties: props },
      ...optional && { optionalProperties: optional },
      ...metadata && { metadata }
    }),
    sealed: (props, optional, metadata) => ({
      nullable: true,
      additionalProperties: false,
      ...props && { properties: props },
      ...optional && { optionalProperties: optional },
      ...metadata && { metadata }
    })
  }
}

jsontypedef.schema = {
  empty: (metadata) => ({
    ...metadata && { metadata }
  }),
  boolean: (metadata) => ({
    type: 'boolean',
    ...metadata && { metadata }
  }),
  string: (metadata) => ({
    type: 'string',
    ...metadata && { metadata }
  }),
  timestamp: (metadata) => ({
    type: 'string',
    format: 'date-time',
    ...metadata && { metadata }
  }),
  number: (metadata) => ({
    type: 'number',
    ...metadata && { metadata }
  }),
  // Added for convenience
  integer: (metadata) => ({
    type: 'integer',
    ...metadata && { metadata }
  }),
  float32: (metadata) => ({
    type: 'number',
    ...metadata && { metadata }
  }),
  float64: (metadata) => ({
    type: 'number',
    ...metadata && { metadata }
  }),
  int8: (metadata) => ({
    type: 'integer',
    ...metadata && { metadata }
  }),
  uint8: (metadata) => ({
    type: 'integer',
    ...metadata && { metadata }
  }),
  int16: (metadata) => ({
    type: 'integer',
    ...metadata && { metadata }
  }),
  uint16: (metadata) => ({
    type: 'integer',
    ...metadata && { metadata }
  }),
  int32: (metadata) => ({
    type: 'integer',
    ...metadata && { metadata }
  }),
  uint32: (metadata) => ({
    type: 'integer',
    ...metadata && { metadata }
  }),
  values: (items, metadata) => ({
    type: 'string',
    enum: items,
    ...metadata && { metadata }
  }),
  array: (type, metadata) => ({
    type: 'array',
    items: type,
    ...metadata && { metadata }
  }),
  object: (props, optional, metadata) => {
    const allProperties = Object.assign({}, props || {}, optional || {})
    const requiredKeys = Object.keys(Object.assign(props || {}))
    return {
      type: 'object',
      additionalProperties: true,
      ...Object.keys(allProperties).length && { properties: allProperties },
      ...requiredKeys.length && { required: requiredKeys },
      ...metadata && { metadata }
    }
  },
  sealed: (props, optional, metadata) => {
    const allProperties = Object.assign({}, props || {}, optional || {})
    const requiredKeys = Object.keys(Object.assign(props || {}))
    return {
      type: 'object',
      additionalProperties: false,
      ...Object.keys(allProperties).length && { properties: allProperties },
      ...requiredKeys.length && { required: requiredKeys },
      ...metadata && { metadata }
    }
  },
  nullable: {
    boolean: (metadata) => ({
      type: ['boolean', 'null'],
      ...metadata && { metadata }
    }),
    string: (metadata) => ({
      type: ['string', 'null'],
      ...metadata && { metadata }
    }),
    timestamp: (metadata) => ({
      type: ['string', 'null'],
      format: 'date-time',
      ...metadata && { metadata }
    }),
    number: (metadata) => ({
      type: ['number', 'null'],
      ...metadata && { metadata }
    }),
    float32: (metadata) => ({
      type: ['number', 'null'],
      ...metadata && { metadata }
    }),
    float64: (metadata) => ({
      type: ['number', 'null'],
      ...metadata && { metadata }
    }),
    // Added for convenience
    integer: (metadata) => ({
      type: ['integer', 'null'],
      ...metadata && { metadata }
    }),
    int8: (metadata) => ({
      type: ['integer', 'null'],
      ...metadata && { metadata }
    }),
    uint8: (metadata) => ({
      type: ['integer', 'null'],
      ...metadata && { metadata }
    }),
    int16: (metadata) => ({
      type: ['integer', 'null'],
      ...metadata && { metadata }
    }),
    uint16: (metadata) => ({
      type: ['integer', 'null'],
      ...metadata && { metadata }
    }),
    int32: (metadata) => ({
      type: ['integer', 'null'],
      ...metadata && { metadata }
    }),
    uint32: (metadata) => ({
      type: ['integer', 'null'],
      ...metadata && { metadata }
    }),
    values: (items, metadata) => ({
      type: ['string', 'null'],
      enum: items,
      ...metadata && { metadata }
    }),
    array: (type, metadata) => ({
      type: ['array', 'null'],
      items: type,
      ...metadata && { metadata }
    }),
    object: (props, optional, metadata) => {
      const allProperties = Object.assign({}, props || {}, optional || {})
      const requiredKeys = Object.keys(Object.assign(props || {}))
      return {
        type: ['object', 'null'],
        additionalProperties: true,
        ...Object.keys(allProperties).length && { properties: allProperties },
        ...requiredKeys.length && { required: requiredKeys },
        ...metadata && { metadata }
      }
    },
    sealed: (props, optional, metadata) => {
      const allProperties = Object.assign({}, props || {}, optional || {})
      const requiredKeys = Object.keys(Object.assign(props || {}))
      return {
        type: ['object', 'null'],
        additionalProperties: false,
        ...Object.keys(allProperties).length && { properties: allProperties },
        ...requiredKeys.length && { required: requiredKeys },
        ...metadata && { metadata }
      }
    }
  }
}

module.exports = jsontypedef
