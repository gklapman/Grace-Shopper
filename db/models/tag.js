'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('tags', {
	tag: {
		type: STRING,
		allowNull: false, 
	}
})

module.exports.associations = (Tag, {Meme}) => {
	Tag.belongsToMany(Meme, {as: 'meme', through: 'meme_tag'})
}