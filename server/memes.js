'use strict'

const db = require('APP/db')
const Meme = db.model('memes')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Meme.findAll()
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
  .get('/:id', (req, res, next) => {
    Meme.findById(req.params.id)
      .then(meme => res.send(meme))
      .catch(next)
  })