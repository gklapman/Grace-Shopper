'use strict'

const db = require('APP/db')
const Tag = db.model('tags')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Tag.findAll()
    .then(tags => {
      console.log('tags', tags)
      res.send(tags)
    })
    .catch(next)
  })
  .get('/:tagId', (req, res, next) => {
    Tag.findById(req.params.tagId)
    .then(tag => {
      return tag.getMemes()
    })
    .then(memes => {
      res.send(memes)
    })
    .catch(next)
  })