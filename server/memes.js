'use strict'

const db = require('APP/db')
const Meme = db.model('memes')
const Tag = db.model('tags')
const {isAdmin} = require('./auth.filters')

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
    let meme;
    Meme.findById(req.params.memeId)
      .then(meme1 => {
        meme = meme1
        return meme.rating
      })
      .then(rating => {
        let obj = {
          id: meme.id,
          name: meme.name,
          photo: meme.photo,
          price: meme.price,
          product_info: meme.product_info,
          stock: meme.stock,
          rating
        }
        res.send(obj)
      })
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
  .post('/:memeId/tags', isAdmin('only admins can add tags'), (req, res, next) => {
    let tag
    let meme
    return Tag.findOrCreate({where: {tag: req.body.tag}})
      .then(tag1 => {
        console.log(tag1)
        tag = tag1[0]
        return Meme.findById(Number(req.params.memeId))
      })
      .then(meme1 => {
        meme = meme1
        return meme.addTags(tag)
      })
      .then(() => {
        res.status(201).send(`${meme} tagged as ${tag}`)
      })
      .catch(next)
  })

  .put('/edit/:memeId', isAdmin('only admins can edit products'), (req, res, next) => {
    //need to send the product info correctly based on the table name
    console.log("BOOOOO YEAHHHH")
    return Meme.findById(req.params.memeId)
    .then(meme => {
      return meme.update(req.body)
    })
    .then(updatedmeme => {
      res.json(updatedmeme)
    })
    .catch(next)
  })

  .post('/add', isAdmin('only admin can add products'), (req, res, next) => {
    console.log(req.body)
    // let {name, photo, product_info, stock} = req.body
    return Meme.create({
      name: req.body.name,
      price: req.body.price,
      photo: req.body.photo,
      product_info: req.body.product_info,
      stock: req.body.stock
    })
    .then(meme => {
      res.json(meme)
    })
  })






