'use strict'

const db = require('APP/db')
const Cart = db.model('carts')
const User = db.model('users')
const Meme = db.model('memes')

module.exports = require('express').Router()
// Gonna need to implement some forbidden stuff here
.get('/:userId', (req, res, next) => {
  Cart.findAll({where: {user_id: req.params.userId, status: 'not-purchased'}})
  .then(items => {
    res.send(items)
  })
  .catch(next)
})


//SORRY THIS IS SO LONG... IF ANYONE HAS ANY WAY TO SHORTEN, LMK
.post('/', (req, res, next)=> {
	console.log('inside of cart post with this body ', req.body)
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

