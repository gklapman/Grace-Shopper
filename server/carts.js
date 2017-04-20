'use strict'

const db = require('APP/db')
const Cart = db.model('carts')

module.exports = require('express').Router()
// Gonna need to implement some forbidden stuff here
.get('/:userId', (req, res, next) => {
  Cart.findAll({where: {user_id: req.params.userId, status: false}})
  .then(items => {
    res.send(items)
  })
  .catch(next)
})