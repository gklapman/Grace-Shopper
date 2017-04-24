'use strict'

const db = require('APP/db')
const Cart = db.model('carts')
const User = db.model('users')
const Meme = db.model('memes')


module.exports = require('express').Router()
.get('/', (req, res, next) => {
  return Cart.findAll({where: {user_id: req.user.id, status: 'purchased'}, include: [Meme]})
  .then(items => {
    res.send(items)
  })
  .catch(next)
})