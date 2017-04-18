'use strict'

const db = require('APP/db')
    , {User, Meme, Favorite, Tag, Promise, Review, Cart} = db
    , {mapValues} = require('lodash')



// function seedEverything() {
//   const seeded = {
//     users: users(),
//     things: things(),
//   }
//   seeded.favorites = favorites(seeded)

const generateUsers = () => {
  let usersArray = []

  usersArray.push(User.build({
    name: 'Barack Obama',
    email: 'barack@example.gov',
    address: 'somewhere far away',
    admin: false,
    password: '1234',
    salt: 'americanpie',
  }))

  usersArray.push(User.build({
    name: 'Mr.Presidnet',
    email: 'donald@trump.com',
    address: '1600 Penn Ave',
    admin: true,
    password: '134',
    salt: 'hackers',
  }))

  return usersArray
}


const generateMemes = () => {
  let memesArray = [];

  memesArray.push(Meme.build({
    name: 'michael',
    price: 9.99,
    rating: 4,
    photo: 'http://4.bp.blogspot.com/-pFRXzhUqYb0/VZNw_h4OTCI/AAAAAAAAEVQ/S94m3_LRK0A/s320/FEARED%2BOR%2BLOVED.jpg',
    product_info: 'This feature michael scott meme is from The Fight eppisode (ep 6 ) season 2 ',
    stock: 2
  }))

  memesArray.push(Meme.build({
    name: 'dwight',
    price: 7.99,
    rating: 2,
    photo: 'http://4.bp.blogspot.com/-pFRXzhUqYb0/VZNw_h4OTCI/AAAAAAAAEVQ/S94m3_LRK0A/s320/FEARED%2BOR%2BLOVED.jpg',
    product_info: 'Dwight here is talking about stuff from his Farm... ',
    stock: 4
  }))

  memesArray.push(Meme.build({
    name: 'jim',
    price: 7.99,
    rating: 2,
    photo: 'http://s2.quickmeme.com/img/ae/ae150e79fb32592c6671db823eec58a4a7f6cd7a14847e600154ddf92e19c078.jpg',
    product_info: 'Jim product information here blah blha blah  ',
    stock: 2
  }))

  return memesArray;
}


//tags belong to many mems through 'meme_tag'

const generateTags = () => {
  let tagsArray = []

  tagsArray.push(Tag.build({
    tag: 'The Offcie'
  }))

  tagsArray.push(Tag.build({
    tag: 'Michale Scott'
  }))

  tagsArray.push(Tag.build({
    tag: 'Comedy'
  }))

  return tagsArray
}


const generateCarts = () => {
  const cartArray = []

  cartArray.push(Cart.build({
    status: false,
    date: new Date(2017,5,18),
    quantity: 0,
    meme_id: 2,
    user_id: 1
  }))

  cartArray.push(Cart.build({
    status: true,
    date: new Date(2017,5,10),
    quantity: 2,
    meme_id: 1,
    user_id: 2
  }))

  return cartArray
}

const generateReviews = () => {
  let reviewArray = []

  reviewArray.push(Review.build({
    content: 'this here is a smashing meme',
    title: 'superb',
    stars: 5,
    meme_id: 1,
    user_id: 1
  }))

  reviewArray.push(Review.build({
    content: 'This meme is not a good one',
    title: 'bad meme hombre',
    stars: 1,
    meme_id: 2,
    user_id: 1
  }))

  return reviewArray
}



// review blongsTo Meme, review blongsto User
// const reviews = seed(Review, ({memes, users}) => ({
//   content: 'this here is a smashing meme',
//   title: 'superb',
//   stars: 5,
//   meme_id: memes.dwight.id,
//   user_id: users.donald.id,

// }))




const createUsers = () => {    //need to resovle the promisese
  let userPromises =  generateUsers().map(user=> { return user.save() })
  return Promise.all(userPromises)
}

const createMemes = () => {
  let memePromises =  generateMemes().map(meme => { return meme.save() })
  return Promise.all(memePromises)
}


const createCart = () => {    // this need to be belonged to meme and user
  let cartPromises = generateCarts().map(cart => { return cart.save()})
  return Promise.all(cartPromises);   // .thenable
}

const createReviews  = () =>{
  let reviewPromises = generateReviews().map(review =>{ return review.save() })
  return Promise.all(reviewPromises)
}

const createTags = (tags) => {
  let tagPromises = generateTags().map(tag => { return tag.save() })
  return Promise.all(tagPromises)
}



// const seed = () =>{

// }

let usersdata, memesdata, cartdata



db.didSync
  //.sync({force: true})
    .then(function() {
      return createUsers()
    })
    .then(function(data) {
      usersdata = data
      return createMemes()
    })
    .then(function(data) {
      memesdata = data
      return createCart()
    })
    .then(function(data) {
      cartdata = data
      return createTags()
    })
    .then(function(){
      createReviews()
      console.log('end of seed')
    })
    .catch(error => {
      console.error('an error occurred', error)
    })


