'use strict'

const {STRING, DECIMAL, TEXT, INTEGER} = require('sequelize')

module.exports = db => db.define('memes', {
  name: {
  	type: STRING,
  	allowNull: false,
  },
  price: {
  	type: DECIMAL(10,2),
  	defaultValue: 100.00
  },
  rating: {
  	type: DECIMAL(10,2),
  }, 
  photo: {
  	type: STRING,
  	defaultValue: '',
  },
  product_info: {
  	type: TEXT,
  	defaultValue: '',
  },
  stock: {
  	type: INTEGER, 
  	allowNull: false, 
  	defaultValue: 0,
  	validate: { 
  		min: 0
  	}
  },

}, {
  setterMethods: {
		setRating(){
			const allReviews = this.getReviews()
			return allReviews 
			.then(reviews => {
				console.log("reviews", reviews)
				if(!reviews){
					this.setDataType('rating', 0)
				} else {
				let total
				reviews.forEach(review => {
					total += review.stars
				})
				const finalRating = total/reviews.length
				this.setDataType('rating', finalRating) 
				}
			})
		}
	}
})

module.exports.associations = (Meme, {User, Favorite, Tag, Review, Cart}) => {
  Meme.belongsToMany(User, {as: 'lovers', through: Favorite})
  Meme.belongsToMany(Tag, {as: 'tag', through: 'meme_tag'})
  Meme.belongsToMany(User, {as: 'reviewers', through: Review})
  Meme.belongsToMany(User, {as: 'purchaser', through: Cart})
}
