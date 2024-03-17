export const empty = (metadata) => ({
  ...(metadata && { metadata }),
})

export const boolean = (metadata) => ({
  type: 'boolean',
  ...(metadata && { metadata }),
})

export const string = (metadata) => ({
  type: 'string',
  ...(metadata && { metadata }),
})

export const timestamp = (metadata) => ({
  type: 'string',
  format: 'date-time',
  ...(metadata && { metadata }),
})

export const number = (metadata) => ({
  type: 'number',
  ...(metadata && { metadata }),
})

// Added for convenience
export const integer = (metadata) => ({
  type: 'integer',
  ...(metadata && { metadata }),
})

export const float32 = (metadata) => ({
  type: 'number',
  ...(metadata && { metadata }),
})

export const float64 = (metadata) => ({
  type: 'number',
  ...(metadata && { metadata }),
})

export const int8 = (metadata) => ({
  type: 'integer',
  ...(metadata && { metadata }),
})

export const uint8 = (metadata) => ({
  type: 'integer',
  ...(metadata && { metadata }),
})

export const int16 = (metadata) => ({
  type: 'integer',
  ...(metadata && { metadata }),
})

export const uint16 = (metadata) => ({
  type: 'integer',
  ...(metadata && { metadata }),
})

export const int32 = (metadata) => ({
  type: 'integer',
  ...(metadata && { metadata }),
})

export const uint32 = (metadata) => ({
  type: 'integer',
  ...(metadata && { metadata }),
})

export const values = (items, metadata) => ({
  type: 'string',
  enum: items,
  ...(metadata && { metadata }),
})
export const array = (type, metadata) => ({
  type: 'array',
  items: type,
  ...(metadata && { metadata }),
})

export const object = (props, optional, metadata) => {
  const allProperties = Object.assign({}, props || {}, optional || {})
  const requiredKeys = Object.keys(Object.assign(props || {}))
  return {
    type: 'object',
    additionalProperties: true,
    ...(Object.keys(allProperties).length && { properties: allProperties }),
    ...(requiredKeys.length && { required: requiredKeys }),
    ...(metadata && { metadata }),
  }
}

export const sealed = (props, optional, metadata) => {
  const allProperties = Object.assign({}, props || {}, optional || {})
  const requiredKeys = Object.keys(Object.assign(props || {}))
  return {
    type: 'object',
    additionalProperties: false,
    ...(Object.keys(allProperties).length && { properties: allProperties }),
    ...(requiredKeys.length && { required: requiredKeys }),
    ...(metadata && { metadata }),
  }
}

export const nullable = {
  boolean: (metadata) => ({
    type: ['boolean', 'null'],
    ...(metadata && { metadata }),
  }),
  string: (metadata) => ({
    type: ['string', 'null'],
    ...(metadata && { metadata }),
  }),
  timestamp: (metadata) => ({
    type: ['string', 'null'],
    format: 'date-time',
    ...(metadata && { metadata }),
  }),
  number: (metadata) => ({
    type: ['number', 'null'],
    ...(metadata && { metadata }),
  }),
  float32: (metadata) => ({
    type: ['number', 'null'],
    ...(metadata && { metadata }),
  }),
  float64: (metadata) => ({
    type: ['number', 'null'],
    ...(metadata && { metadata }),
  }),
  // Added for convenience
  integer: (metadata) => ({
    type: ['integer', 'null'],
    ...(metadata && { metadata }),
  }),
  int8: (metadata) => ({
    type: ['integer', 'null'],
    ...(metadata && { metadata }),
  }),
  uint8: (metadata) => ({
    type: ['integer', 'null'],
    ...(metadata && { metadata }),
  }),
  int16: (metadata) => ({
    type: ['integer', 'null'],
    ...(metadata && { metadata }),
  }),
  uint16: (metadata) => ({
    type: ['integer', 'null'],
    ...(metadata && { metadata }),
  }),
  int32: (metadata) => ({
    type: ['integer', 'null'],
    ...(metadata && { metadata }),
  }),
  uint32: (metadata) => ({
    type: ['integer', 'null'],
    ...(metadata && { metadata }),
  }),
  values: (items, metadata) => ({
    type: ['string', 'null'],
    enum: items,
    ...(metadata && { metadata }),
  }),
  array: (type, metadata) => ({
    type: ['array', 'null'],
    items: type,
    ...(metadata && { metadata }),
  }),
  object: (props, optional, metadata) => {
    const allProperties = Object.assign({}, props || {}, optional || {})
    const requiredKeys = Object.keys(Object.assign(props || {}))
    return {
      type: ['object', 'null'],
      additionalProperties: true,
      ...(Object.keys(allProperties).length && { properties: allProperties }),
      ...(requiredKeys.length && { required: requiredKeys }),
      ...(metadata && { metadata }),
    }
  },
  sealed: (props, optional, metadata) => {
    const allProperties = Object.assign({}, props || {}, optional || {})
    const requiredKeys = Object.keys(Object.assign(props || {}))
    return {
      type: ['object', 'null'],
      additionalProperties: false,
      ...(Object.keys(allProperties).length && { properties: allProperties }),
      ...(requiredKeys.length && { required: requiredKeys }),
      ...(metadata && { metadata }),
    }
  },
}

export default {
  empty,
  boolean,
  string,
  timestamp,
  number,
  integer,
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
  sealed,
  nullable,
}
