'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, BOOLEAN} = require('sequelize')

module.exports = db => db.define('users', {
  name: STRING,
  email: {
    type: STRING,
    validate: {
      isEmail: true,
      notEmpty: true,
    }
  },
  address: STRING, 
  admin: BOOLEAN,  

  // We support oauth, so users may or may not have passwords.
  password_digest: STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: VIRTUAL,
  salt: STRING,
   // Note that this is a virtual, and not actually stored in DB

}, {
  indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) =>
            err ? reject(err) : resolve(result))
        )
    }
  }
})

module.exports.associations = (User, {OAuth, Meme, Favorite, Cart, Review}) => {
  User.hasOne(OAuth)
  User.belongsToMany(Meme, {as: 'favorites', through: Favorite})
  User.belongsToMany(Meme, {as: 'reviews', through: Review})
  // User.belongsToMany(Meme, {as: 'cartItem', through: Cart})
  User.hasMany(Review)
  User.hasMany(Favorite)
  User.hasMany(Cart)
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return new Promise((resolve, reject) =>
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) return reject(err)
      user.set('password_digest', hash)
      resolve(user)
    })
  )
}
