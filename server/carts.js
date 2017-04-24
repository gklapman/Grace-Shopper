'use strict'

const db = require('APP/db')
const Cart = db.model('carts')
const User = db.model('users')
const Meme = db.model('memes')

module.exports = require('express').Router()
// Gonna need to implement some forbidden stuff here

.get('/', (req, res, next) => {
	// console.log(req.user)
	if (req.session.passport.user) {
		Cart.findAll({where: {user_id: req.session.passport.user, status: false}})
		.then(items => {
			res.send(items)
		})
		.catch(next)
	} else if (req.session.cart) {
	res.send(req.session.cart)
	} else {
		res.send([])
	}
})

.get('/:userId', (req, res, next) => {
  Cart.findAll({where: {user_id: req.params.userId, status: false}})
  .then(items => {
    res.send(items)
  })
  .catch(next)
})

.post('/', (req, res, next)=> {
	if (req.session.passport.user) {
		// logic for authed users
		console.log('inside of cart post with this body ', req.body)
		let user;
		return User.findOne({
			where: {
				user_id: req.body.userId
			}
		})
	} else {
		req.session.cart = req.session.cart || []
		req.session.cart.push(req.body)
	}
})