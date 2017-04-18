'use strict'

const {STRING, TEXT, INTEGER} = require('sequelize')

module.exports = db => db.define('reviews', {
	content: {
		type: TEXT,
		notEmpty: true,
	},
	title: {
		type: STRING, 

	}, 
	stars: {
		type: INTEGER,
		validate: {
			min: 1, 
			max: 5,
		}
	}
},{
	hooks: {
		beforeValidate: {
			setTitle: () => {
				if (!this.title){
					const dots = this.content.length > 15 ? "..." : "";
					this.setDataValue('title', this.content.slice(0, 15) + dots)
				}
			}
		}
	} 

})


module.exports.associations = (Review, {Meme, User}) => {
  Review.belongsTo(Meme)
  Review.belongsTo(User)
}
