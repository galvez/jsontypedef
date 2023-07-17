# jsontypedef

Syntactic sugar for creating **JSON Type Definition** ([RFC 8927](https://jsontypedef.com/)).

All types from [Learn JSON Typedef in 5 Minutes](https://jsontypedef.com/docs/jtd-in-5-minutes/) are covered, preserving original naming with a few exceptions: 

- `enum` is created via `values()`, _because `enum` is a reserved keyword_
- `elements` is created via `array()`, _for brevity_
- `properties` is called `object()`, _for brevity_
- `discriminator` is called `match()`, _for brevity_

## Install

```bash
npm install jsontypedef
```

## Example

Write:

```js
const { string, number, object } = require('jsontypedef')

console.log(object({
  propertyA: string(),
  propertyB: object({
    innerPropertyC: number(),
  })
}))
```

Get:

```js
{
  properties: {
    propertyA: { type: 'string' },
    propertyB: {
      properties: {
        innerPropertyC: { type: 'float64' }
      }
    }
  }
}
```

Saves you a good deal of typing maintaining big type definitions.

See all examples [in the test suite](https://github.com/galvez/jsontypedef/blob/main/test.js).

## API: Basic Types

- `empty(metadata)`
- `boolean(metadata)`
- `string(metadata)`
- `timestamp(metadata)`
- `float64(metadata)` (JavaScript numbers)
- `number(metadata)` # alias to float64()
- `integer(metadata)` # alias to float64()

### API: Specialized Numeric Types

For compatibility with other languages and full JTD support:

- `float32(metadata)`
- `int8(metadata)`
- `uint8(metadata)`
- `int16(metadata)`
- `uint16(metadata)`
- `int32(metadata)`
- `uint32(metadata)`

## API: Advanced Types

- `values(items, metadata)` is an alias to create the `enum` JTD form.
  - `enum` is a reserved word in JavaScript.
- `array(type, metadata)` creates the `elements` JTD form
- `object(props, optional, additional)` creates the `properties` JTD form
- `match(field, mapping, metadata)` creates the `discriminator` JTD form

## API: Nullable Types

A `nullable` helper is provided for easily creating nullable rules.

```js
const { nullable } = require('jsontypedef')
```

- `nullable.empty(metadata)`
- `nullable.boolean(metadata)`
- `nullable.string(metadata)`
- `nullable.timestamp(metadata)`
- `nullable.float64(metadata)` (JavaScript numbers)
- `nullable.number(metadata)` # alias to float64()
- `nullable.integer(metadata)` # alias to float64()
- `nullable.float32(metadata)`
- `nullable.int8(metadata)`
- `nullable.uint8(metadata)`
- `nullable.int16(metadata)`
- `nullable.uint16(metadata)`
- `nullable.int32(metadata)`
- `nullable.uint32(metadata)`
- `nullable.values(items, metadata)` is an alias to create the `enum` JTD form.
  - `enum` is a reserved word in JavaScript.
- `nullable.array(type, metadata)` creates the `elements` JTD form
- `nullable.object(props, optional, additional)` creates the `properties` JTD form


## JSON Schema compatibility

Functionality-wise, [JSON Type Definition](https://jsontypedef.com/) is a subset of [JSON Schema](https://json-schema.org/), with one exception: JSON Schema doesn't support tagged unions (the `discriminator` JTD form). There are no data constraints, so you can't say a string is supposed to have a length of 5, you can only say a string is a string. 

Fastify uses `ajv` for validation and serialization, but only supports JSON Schema out of the box, although its `addSchema()` method could be reworked to recognize JTD in the future. Although `ajv` itself [already supports JSON Type Definition](https://github.com/ajv-validator/ajv/blob/master/docs/json-type-definition.md), it might take a while for the support to come to Fastify.

That is not a problem because we can easily translate JTD schemas to JSON Schema with the `schema` helper provided by this library:

This library offers the `schema` helper, which offers all methods from the main API but will output JSON Schema compatible schemas. So you can use it with Fastify:

```js
const fastify = require('fastify')()
const { schema: { object, string } } = require('jsontypedef')

const schema = {
  headers: object({
    'x-foo': string()
  }),
}

fastify.post('/the/url', { schema }, (req, reply) => {
  reply.send('ok')
})
```

The `schema` helper also includes `number()` and `integer()` for convenience.

See the [**full test suite**](https://github.com/galvez/jsontypedef/tree/main/test) for more usage examples.

