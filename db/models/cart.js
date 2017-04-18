'use strict'

const {INTEGER, BOOLEAN, DATE} = require('sequelize')

module.exports = db => db.define('carts', {
	status: {
		type: BOOLEAN,
		defualtValue: false,
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
