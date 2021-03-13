# jsontypedef

Syntactic sugar for creating JSON Type Definitions ([RFC 8927](https://jsontypedef.com/)).

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
const { string, float64, object } = require('jsontypedef')

console.log(object({
  propertyA: string(),
  propertyB: object({
    innerPropertyC: float64(),
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

## API

- `empty()`
- `boolean(nullable, metadata)`
- `string(nullable, metadata)`
- `timestamp(nullable, metadata)`
- `float32(nullable, metadata)`
- `float64(nullable, metadata)`
- `int8(nullable, metadata)`
- `uint8(nullable, metadata)`
- `int16(nullable, metadata)`
- `uint16(nullable, metadata)`
- `int32(nullable, metadata)`
- `uint32(nullable, metadata)`
- `values(items, nullable, metadata)`
- `array(type, nullable, metadata)`
- `object(props, optional, additional, nullable)`
- `match(field, mapping, nullable, metadata)`

## JSON Schema compatibility

[JSON Type Definition](https://jsontypedef.com/) is a subset of [JSON Schema](https://json-schema.org/). There are no data constraints, so you can't say a string is supposed to have a length of 5, you can only say a string is a string. For most projects, that might just be what you need.

Fastify uses `ajv` for validation and serialization, but only supports JSON Schema. Although `ajv` itself [already supports JSON Type Definition](https://github.com/ajv-validator/ajv/blob/master/docs/json-type-definition.md), it might take a while for the support to come to Fastify.

That is not a problem because we can easily translate JTD schemas to JSON Schema, with the exception of [`discriminator`](https://tools.ietf.org/html/rfc8927#section-2.2.8) which isn't well supported in JSON Schema.

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

See the [example/](https://github.com/galvez/jsontypedef/tree/main/example) folder.

