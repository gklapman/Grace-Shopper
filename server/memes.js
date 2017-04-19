'use strict'

const db = require('APP/db')
const Meme = db.model('memes')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Meme.findAll()
      .then(memes => res.json(memes))
      .catch(next)
  })
  .get('/:id', (req, res, next) => {
    Meme.findById(req.params.id)
      .then(meme => res.json(meme))
      .catch(next)
  })