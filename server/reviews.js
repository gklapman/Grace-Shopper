'use strict'

const db = require('APP/db')
const Review = db.model('reviews')

module.exports = require('express').Router()
  .post('/', (req, res, next) => {
    console.log('req body',req.body)
    Review.create(req.body)
    .then(review => {
      console.log('review created', review)
      res.status(201).send('created sucessfully')
    })
    .catch(next)
  })

