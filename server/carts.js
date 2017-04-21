'use strict'

const db = require('APP/db')
const Cart = db.model('carts')
const User = db.model('users')
const Meme = db.model('memes')

module.exports = require('express').Router()
// Gonna need to implement some forbidden stuff here
.get('/:userId', (req, res, next) => {
  Cart.findAll({where: {user_id: req.params.userId, status: false}})
  .then(items => {
    res.send(items)
  })
  .catch(next)
})

.post('/', (req, res, next)=> {
	console.log('inside of cart post with this body ', req.body)
	let user;
	return User.findOne({
		where: {
			user_id: req.body.userId
		}
	})
})