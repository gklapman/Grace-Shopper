'use strict'

const db = require('APP/db')
const Tag = db.model('tags')
const Meme = db.model('memes')
const {isAdmin} = require('./auth.filters')

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
  // .post('/edit', (req, res, next) => {
  //   let tag;
  //   let meme;
  //   return Tag.findOrCreate({tag: req.body.tag})
  //   .then(tag1 => {
  //     tag = tag1
  //     return Meme.findById(req.body.tagId)
  //   })
  //   .then(meme1 => {
  //     meme = meme1
  //     return meme.addTag(tag)
  //   })
  //   .then(() => {
  //     res.status(201).send(`${meme} tagged as ${tag}`)
  //   })
  //   .catch(next)
  // })