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
  type: 'timestamp',
  ...(metadata && { metadata }),
})

export const number = (metadata) => ({
  type: 'float64',
  ...(metadata && { metadata }),
})

export const integer = (metadata) => ({
  type: 'float64',
  ...(metadata && { metadata }),
})

export const float32 = (metadata) => ({
  type: 'float32',
  ...(metadata && { metadata }),
})

export const float64 = (metadata) => ({
  type: 'float64',
  ...(metadata && { metadata }),
})

export const int8 = (metadata) => ({
  type: 'int8',
  ...(metadata && { metadata }),
})

export const uint8 = (metadata) => ({
  type: 'uint8',
  ...(metadata && { metadata }),
})

export const int16 = (metadata) => ({
  type: 'int16',
  ...(metadata && { metadata }),
})

export const uint16 = (metadata) => ({
  type: 'uint16',
  ...(metadata && { metadata }),
})

export const int32 = (metadata) => ({
  type: 'int32',
  ...(metadata && { metadata }),
})

export const uint32 = (metadata) => ({
  type: 'uint32',
  ...(metadata && { metadata }),
})

export const values = (items, metadata) => ({
  enum: items,
  ...(metadata && { metadata }),
})

export const array = (type, metadata) => ({
  elements: type,
  ...(metadata && { metadata }),
})

export const object = (props, optional, metadata) => ({
  additionalProperties: true,
  ...(props && { properties: props }),
  ...(optional && { optionalProperties: optional }),
  ...(metadata && { metadata }),
})

export const sealed = (props, optional, metadata) => ({
  additionalProperties: false,
  ...(props && { properties: props }),
  ...(optional && { optionalProperties: optional }),
  ...(metadata && { metadata }),
})

export const match = (field, mapping, metadata) => ({
  discriminator: field,
  mapping,
  ...(metadata && { metadata }),
})

export const nullable = {
  boolean: (metadata) => ({
    nullable: true,
    type: 'boolean',
    ...(metadata && { metadata }),
  }),
  string: (metadata) => ({
    nullable: true,
    type: 'string',
    ...(metadata && { metadata }),
  }),
  timestamp: (metadata) => ({
    nullable: true,
    type: 'timestamp',
    ...(metadata && { metadata }),
  }),
  number: (metadata) => ({
    nullable: true,
    type: 'float64',
    ...(metadata && { metadata }),
  }),
  integer: (metadata) => ({
    nullable: true,
    type: 'float64',
    ...(metadata && { metadata }),
  }),
  float32: (metadata) => ({
    nullable: true,
    type: 'float32',
    ...(metadata && { metadata }),
  }),
  float64: (metadata) => ({
    nullable: true,
    type: 'float64',
    ...(metadata && { metadata }),
  }),
  int8: (metadata) => ({
    nullable: true,
    type: 'int8',
    ...(metadata && { metadata }),
  }),
  uint8: (metadata) => ({
    nullable: true,
    type: 'uint8',
    ...(metadata && { metadata }),
  }),
  int16: (metadata) => ({
    nullable: true,
    type: 'int16',
    ...(metadata && { metadata }),
  }),
  uint16: (metadata) => ({
    nullable: true,
    type: 'uint16',
    ...(metadata && { metadata }),
  }),
  int32: (metadata) => ({
    nullable: true,
    type: 'int32',
    ...(metadata && { metadata }),
  }),
  uint32: (metadata) => ({
    nullable: true,
    type: 'uint32',
    ...(metadata && { metadata }),
  }),
  values: (items, metadata) => ({
    nullable: true,
    enum: items,
    ...(metadata && { metadata }),
  }),
  array: (type, metadata) => ({
    nullable: true,
    elements: type,
    ...(metadata && { metadata }),
  }),
  object: (props, optional, metadata) => ({
    nullable: true,
    additionalProperties: true,
    ...(props && { properties: props }),
    ...(optional && { optionalProperties: optional }),
    ...(metadata && { metadata }),
  }),
  sealed: (props, optional, metadata) => ({
    nullable: true,
    additionalProperties: false,
    ...(props && { properties: props }),
    ...(optional && { optionalProperties: optional }),
    ...(metadata && { metadata }),
  }),
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
  match,
  nullable,
}
