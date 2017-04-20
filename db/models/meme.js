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
//   rating: {
//   	type: DECIMAL(10,2),
//   }, 
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
  getterMethods: {
	rating: function() {
			const allReviews = this.getReviews()
			return allReviews 
			.then(reviews => {
				if(reviews.length === 0){
					// this.setDataValue('rating', '0.00')
					return('0.00')
				} else {
					let total = 0;
					reviews.forEach(review => {
						total += Number(review.dataValues.stars)
					})
					const finalRating = total/reviews.length
					// this.setDataValue('rating', finalRating)
					return(finalRating.toFixed(2))
				}
			})
		}
	}
})

module.exports.associations = (Meme, {User, Favorite, Tag, Review, Cart}) => {
  Meme.belongsToMany(User, {as: 'lovers', through: Favorite})
  Meme.belongsToMany(Tag, {as: 'tags', through: 'meme_tag'})
  Meme.belongsToMany(User, {as: 'reviewers', through: Review})
  Meme.belongsToMany(User, {as: 'purchasers', through: Cart})
  Meme.hasMany(Review)
  Meme.hasMany(Cart)
  Meme.hasMany(Favorite)
}
