'use strict'

const {INTEGER, BOOLEAN, DATE, ENUM} = require('sequelize')

module.exports = db => db.define('carts', {
	status: {
		type: ENUM('purchased', 'not-purchased'),
		defaultValue: 'not-purchased',
	}, 
	date: {
		type: DATE,
	},
	quantity: {
		type: INTEGER,
		defaultValue: 0,
		validate: {
			min: 0,
		}
	},
	//POSSIBLE FIELD FOR GUEST VS. USER ID

})


module.exports.associations = (Cart, {Meme, User}) => {
  Cart.belongsTo(Meme)
  Cart.belongsTo(User)
}
