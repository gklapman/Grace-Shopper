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



.post('/', (req, res, next)=> {
	if (req.user) {
			return Cart.findOrCreate({
				where :{
					user_id: req.user.id,
					meme_id: req.body.memeId,
					status: 'not-purchased'
				}
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

.get('/checkout', (req, res, next) => {
	let updateMatrix
	if (req.user) {
		Cart.update({status: 'purchased'}, {where: {user_id: req.user.id, status: 'not-purchased'}, returning: true})
		.then(items => {
			let bob = items
			bob.shift()
			updateMatrix = bob.map(item => {
				return [item[0].quantity, item[0].meme_id]
			})
			return updateMatrix.map(item => {
				return Meme.findById(item[1])
			})
		})
		.then(promises => {
			return Promise.all(promises)
		})
		.then(memes => {
			updateMatrix = updateMatrix.map((item, index) => {
				return [memes[index].stock - item[0], item[1]]
			})
			return updateMatrix.map(item => {
				return Meme.update({stock: item[0]}, {where: {id: item[1]}})
			})
		})
		.then(map => {
			return Promise.all(map)
		})
		.then(resolution => {
			res.send(resolution)
		})
		.catch(err => {
			console.log('error!', err)
		})
	} else {
		// code for unauths (guests)
		console.log('sesh', req.session)
		updateMatrix = req.session.cart.map(item => {
			return [Number(item.quantity), Number(item.meme_id)]
		})
		let promises = updateMatrix.map(item => {
				return Meme.findById(item[1])
			})
		Promise.all(promises)
		.then(memes => {
			updateMatrix = updateMatrix.map((item, index) => {
				return [memes[index].stock - item[0], item[1]]
			})
			return updateMatrix.map(item => {
				return Meme.update({stock: item[0]}, {where: {id: item[1]}})
			})
		})
		.then(map => {
			return Promise.all(map)
		})
		.then(resolution => {
			req.session.cart = null
			res.send(resolution)
		})
		.catch(err => {
			console.log('error!', err)
		})
	}
})