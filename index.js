'use strict'

const { keys } = Object

const jsontypedef = {
  empty: () => ({}),
  boolean: (nullable, metadata) => ({
    type: 'boolean',
    ...nullable && { nullable },
    ...metadata && { metadata },
  }),
  string: (nullable, metadata) => ({
    type: 'string',
    ...nullable && { nullable },
    ...metadata && { metadata },
  }),
  timestamp: (nullable, metadata) => ({
    type: 'timestamp',
    ...nullable && { nullable },
    ...metadata && { metadata },
  }),
  float32: (nullable, metadata) => ({
    type: 'float32',
    ...nullable && { nullable },
    ...metadata && { metadata },
  }),
  float64: (nullable, metadata) => ({
    type: 'float64',
    ...nullable && { nullable },
    ...metadata && { metadata },
  }),
  int8: (nullable, metadata) => ({
    type: 'int8',
    ...nullable && { nullable },
    ...metadata && { metadata },
  }),
  uint8: (nullable, metadata) => ({
    type: 'uint8',
    ...nullable && { nullable },
    ...metadata && { metadata },
  }),
  int16: (nullable, metadata) => ({
    type: 'int16',
    ...nullable && { nullable },
    ...metadata && { metadata },
  }),
  uint16: (nullable, metadata) => ({
    type: 'uint16',
    ...nullable && { nullable },
    ...metadata && { metadata },
  }),
  int32: (nullable, metadata) => ({
    type: 'int32',
    ...nullable && { nullable },
    ...metadata && { metadata },
  }),
  uint32: (nullable, metadata) => ({
    type: 'uint32',
    ...nullable && { nullable },
    ...metadata && { metadata },
  }),
  values: (items, nullable, metadata) => ({
    enum: items,
    ...nullable && { nullable },
    ...metadata && { metadata },
  }),
  array: (type, nullable, metadata) => ({
    elements: type,
    ...nullable && { nullable },
    ...metadata && { metadata },
  }),
  object: (props, optional, additional, nullable) => ({
    properties: props,
    ...optional && { optionalProperties: optional },
    ...additional && { additionalProperties: additional },
    ...nullable && { nullable },
  }),
  match: (field, mapping, nullable, metadata) => ({
    discriminator: field,
    mapping: keys(mapping).reduce((config, type) => {
      config[type] = jsontypedef.object(mapping[type])
      return config
    }, {}),
    ...nullable && { nullable },
    ...metadata && { metadata },
  })
}

module.exports = jsontypedef
