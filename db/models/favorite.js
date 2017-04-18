'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('favorites')

module.exports.associations = (Favorite, {Meme, User}) => {
  Favorite.belongsTo(Meme)
  Favorite.belongsTo(User)
}
