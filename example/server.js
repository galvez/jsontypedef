const fastify = require('fastify')()
const { schema: { object, string } } = require('../index')

const headersJsonSchema = object({
  'x-foo': string()
})

const schema = {
  headers: headersJsonSchema
}

fastify.post('/the/url', { schema }, (req, reply) => {
  reply.send('ok')
})

fastify.listen(4000, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Listening at ${address}`)
})
