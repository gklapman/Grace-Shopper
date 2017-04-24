'use strict'

const db = require('APP/db')
const Meme = db.model('memes')
const Tag = db.model('tags')

module.exports = require('express').Router()
// The reason this code sucks is because the getter method
// for meme.review returns a promise which needs to be resolved
  .get('/', (req, res, next) => {
    Meme.findAll()
      .then(memes => {
        let bob = []
        memes.forEach(meme => {
          bob.push(meme.rating)
        })
        return Promise.all(bob)
        .then(bobs => {
          let focus = 0
          let resolvedMemes = memes.map(meme => {
            let obj = {
              id: meme.id,
              name: meme.name,
              photo: meme.photo,
              price: meme.price,
              product_info: meme.product_info,
              stock: meme.stock,
              rating: bobs[focus]
            }
            focus++
            return obj
          })
          return res.send(resolvedMemes)
        })
      })
      .catch(next)
  })
  .get('/:memeId', (req, res, next) => {
    Meme.findById(req.params.memeId)
      .then(meme => res.send(meme))
      .catch(next)
  })
  .get('/:memeId/reviews', (req, res, next) => {
    Meme.findById(req.params.memeId)
      .then(meme => {
        return meme.getReviews()
      })
      .then(reviews => {
        res.send(reviews)
      })
      .catch(next)
  })
  .get('/:memeId/reviews/:userId', (req, res, next) => {
    Meme.findById(req.params.memeId)
      .then(meme => {
        return meme.getReviews()
      })
      .then(reviews => {
        return reviews.filter(review => {
          return review.user_id == req.params.userId
        })[0]
      })
      .then(review => {
        res.send(review)
      })
      .catch(next)
  })
  .get('/:memeId/tags', (req, res, next) => {
    Meme.findById(req.params.memeId)
      .then(meme => {
        return meme.getTags()
      })
      .then(tags => {
        res.send(tags)
      })
      .catch(next)
  })
  .post('/:memeId/tags', (req, res, next) => {
    Tag.findOrCreate({tag: req.body.tag})
      .then(tag => {
        return Meme.findById(req.params.memeId)
      })
      .then(meme => {
        return meme.addTags(tag)
      })
      .then(() => {
        res.status(201).send(`${meme} tagged as ${tag}`)
      })
      .catch(next)
  })