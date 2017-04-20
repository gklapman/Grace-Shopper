'use strict'

const db = require('APP/db')
const Review = db.model('Reviews')

module.exports = require('express').Router()
  .post('/', (req, res, next) => {
    Review.create(req.body)
    .then(review => {
      console.log('review created', review)
      res.status(201).send('created sucessfully')
    })
    .catch(next)
  })

