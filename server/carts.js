'use strict'

const db = require('APP/db')
const Cart = db.model('carts')
const User = db.model('users')
const Meme = db.model('memes')
const {selfOnly} = require('./auth.filters')

module.exports = require('express').Router()
.get('/:userId', (req, res, next) => {
  return Cart.findAll({where: {user_id: req.user.id, status: 'not-purchased'}, include: [Meme]})
  .then(items => {
    res.send(items)
  })
  .catch(next)
})


//SORRY THIS IS SO LONG... IF ANYONE HAS ANY WAY TO SHORTEN, LMK
.post('/', (req, res, next)=> {
	let user;
	let meme;
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
})

