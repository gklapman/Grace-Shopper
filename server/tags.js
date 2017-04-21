'use strict'

const db = require('APP/db')
const Tag = db.model('tags')
const Meme = db.model('memes')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Tag.findAll({order: [['tag', 'ASC']]})
    .then(tags => {
      res.send(tags)
    })
    .catch(next)
  })
  .get('/:tagId', (req, res, next) => {
    Tag.findById(req.params.tagId)
    .then(tag => {
      return tag.getMemes()
      //need to mod for promises from ratings
    })
    .then(memes => {
      let bob = []
      memes.forEach(meme => {
        bob.push(meme.rating)
      })
      Promise.all(bob)
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
        res.send(resolvedMemes)
      })
    })
    .catch(next)
  })