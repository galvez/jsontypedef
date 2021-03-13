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
object({
  propertyA: string(),
  propertyB: object({
    innerPropertyC: float64(),
  })
})
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
