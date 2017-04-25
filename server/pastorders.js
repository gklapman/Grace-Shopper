'use strict'

const db = require('APP/db')
const Cart = db.model('carts')
const User = db.model('users')
const Meme = db.model('memes')
const {isAdmin} = require('./auth.filters')


module.exports = require('express').Router()

.get('/', (req, res, next) => {
  return Cart.findAll({where: {
  	user_id: req.user.id,
  	 status: 'purchased'
  	}, include: [Meme]})
  .then(items => {
    res.send(items)
  })
  .catch(next)
})

.get('/allorders', isAdmin('only admins can view all orders'), (req, res, next) => {
	return Cart.findAll({
		where: {
			status: 'purchased'
		}, include: [Meme]
	})
	.then(cartitems => {
		res.json(cartitems)
	})

})

.get('/:userId', isAdmin('only admins can access purchase history'), (req, res, next) => {
	return Cart.findAll({
		where: {
			user_id: req.params.userId,
			status: 'purchased'
		}, include: [Meme]
	})
	.then(cartitems => {
		res.json(cartitems)
	})
})