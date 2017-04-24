'use strict'

const {STRING, TEXT, INTEGER} = require('sequelize')

module.exports = db => db.define('reviews', {

	content: {
		type: TEXT,
		defaultValue: ''
	},
	title: {
		type: STRING,
	}, 
	stars: {
		type: INTEGER,
		allowNull: false,
		validate: {
			min: 1, 
			max: 5,
		}
	}
},{
	hooks: {
		beforeValidate: (review) => {
				if (!review.title){
					const dots = review.content.length > 15 ? "..." : "";
					review.setDataValue('title', review.content.slice(0, 15) + dots)
				}
			}
		}
	} 

)



module.exports.associations = (Review, {Meme, User}) => {
  Review.belongsTo(Meme)
  Review.belongsTo(User)
}
