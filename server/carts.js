'use strict'

const db = require('APP/db')
const Cart = db.model('carts')
const User = db.model('users')
const Meme = db.model('memes')
const {selfOnly} = require('./auth.filters')

module.exports = require('express').Router()
// Gonna need to implement some forbidden stuff here

.get('/', (req, res, next) => {
	let cart = req.session.cart || []
	res.send(cart)
})

.get('/:userId', (req, res, next) => {
  return Cart.findAll({where: {user_id: req.user.id, status: 'not-purchased'}, include: [Meme]})
  .then(items => {
    res.send(items)
  })
  .catch(next)
})


//SORRY THIS IS SO LONG... IF ANYONE HAS ANY WAY TO SHORTEN, LMK
.post('/', (req, res, next)=> {
<<<<<<< HEAD
	let user;
	let meme;
	if (req.user) {
		// logic for authed users
		return User.findOne({
			where: {
				id: req.body.userId
			}
		})
		.then(user1 => {
			user = user1;
			return Meme.findOne({
				where: {
					id: req.body.memeId
				}
			})
		})
		.then(meme1 => {
			meme = meme1
			return Cart.findOrCreate({
				where :{
					user_id: user.id,
					meme_id: meme.id,
				}
			})
		})
		.spread((cart, created) => {
			let quant =  cart.quantity + 1
			return cart.update({
				quantity: quant,	
			})
		})	
		.then(cart => {
			res.json(cart)
		})
		.catch(err => console.error(err))
	} else {
		req.session.cart = req.session.cart || []
		let added = false
		req.session.cart.forEach(item => {
			if (item.meme_id == req.body.memeId) {
				item.quantity++
				added = true
			}
		})
		if (!added) {
			req.session.cart.push({quantity: 1, meme_id: memeId})
		}
		res.json(req.session.cart)
	}
})
