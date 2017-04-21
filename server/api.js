'use strict'

const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/memes', require('./memes'))
  .use('/tags', require('./tags'))
  .use('/carts', require('./carts'))
  .use('/reviews', require('./reviews'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
