'use strict'

const db = require('APP/db')
const Cart = db.model('carts')
const User = db.model('users')
const Meme = db.model('memes')
const {selfOnly} = require('./auth.filters')

module.exports = require('express').Router()
// Gonna need to implement some forbidden stuff here

.get('/', (req, res, next) => {
	if (!req.user) {
		let cart = req.session.cart || []
		let bob = []
		cart.forEach(item => {
			bob.push(Meme.findById(Number(item.meme_id)))
		})
		return Promise.all(bob)
		.then(bobItems => {
			let cartItems = bobItems.map((meme, index) => {
				return {
					meme: meme,
					quantity: cart[index].quantity,
					meme_id: cart[index].meme_id
				}
			})
			return res.json(cartItems)
		})

	} else {
		return Cart.findAll({where: {user_id: req.user.id, status: 'not-purchased'}, include: [Meme]})
		.then(items => {
			return res.send(items)
		})
		.catch(next)
	}
})
// TODO: REST architecture
.post('/remove', (req, res, next)=> {
	if (req.user){
		let userId = req.user.id 
		return Cart.findOne({
			where: {
				user_id: userId,
				meme_id: req.body.memeId
			}
		})
		.then(item => {
			let quant = item.quantity -1 
			return item.update({
				quantity: quant
			})
		})
		.then(item => {
			res.json(item)
		})
	} else {
		req.session.cart = req.session.cart || []
		req.session.cart.forEach(item => {
			if (item.meme_id == req.body.memeId) {
				if (item.quantity > 0){
				item.quantity--
				}
			}
		})

		res.json(req.session.cart)
	}

})


//SORRY THIS IS SO LONG... IF ANYONE HAS ANY WAY TO SHORTEN, LMK
.post('/', (req, res, next)=> {
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
					status: 'not-purchased'
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
			req.session.cart.push({quantity: 1, meme_id: req.body.memeId})
		}
		res.json(req.session.cart)
	}
})
