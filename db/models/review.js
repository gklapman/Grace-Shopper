'use strict'

const {STRING, TEXT, INTEGER} = require('sequelize')

module.exports = db => db.define('reviews', {
	content: {
		type: TEXT,
		defaultValue: '',
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
					this.setDataValue('title', this.content.slice(0, 15) + "...")
				}
			}
		}
	} 

})


module.exports.associations = (Review, {Meme, User}) => {
  Review.belongsTo(Meme)
  Review.belongsTo(User)
}
