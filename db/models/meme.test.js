'use strict'

const db = require('APP/db')
    , {Meme, Review, User} = db
    , {expect} = require('chai')

const hook = (meme) => {
			const allReviews = meme.getReviews()
			return allReviews 
			.then(reviews => {
				console.log("reviews", reviews)
				if(reviews.length === 0){
					console.log('if works')
					return '0.00'
				} else {
					console.log('there are some reviews')
					let total = 0;
					reviews.forEach(review => {
						total += Number(review.dataValues.stars)
					})
					const finalRating = total/reviews.length
                    
					return finalRating
				}
			})
		}

describe('Meme', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('tests for memes', () => {
      let meme;
      let user;
      beforeEach(() => {
          return Meme.create({name: 'charlesOnSubway', price: 60.40, stock: 40})
          .then((memez) => {
              meme = memez
              return User.create({email: 'butts@gmail.org'})
          })
          .then((userz) => {
              user = userz
              return User.create({email: 'hey@guys.biz'})
          })
          .then(() => {
              console.log("sucsdaf")
          })
      })
      afterEach('Clear the tables', () => db.truncate({ cascade: true }))
      it('price is stored correctly', () => {
          expect(meme.price).to.equal('60.40')
          console.log(meme.rating)
      })
    it.only('rating', () => {
        // console.dir(meme, {depth: 3})

        // console.log('assoc', Meme.associations)
        // let rev;
        // return Review.create({stars: 1})
        // .then((review)=> {
        //     rev = review 
        //     return User.create({email: 'butts@blah.net'})
        // })
        // .then((user) => {
        //     return rev.setUser(user)
        // })
        // .then((asdfd) => {
        //     return rev.setMeme(meme)
        // })



        return meme.createReview({stars: 1, title: 'hell', user_id: 1})
        .then(review => {
            return meme.getReviews()
        })
        .then(returned => {
            return meme.createReview({stars: 5, title: 'hell pt 2', user_id: 2})
        })
        .then(() => {
            return meme.failedHook
        })
        .then((hooked) => {
            expect(hooked).to.equal('3.00')
        })


         // return Review.create({stars: 1})
        // .then(review => {
        //     return meme.addReview(review)
        // })
        // .then (() => {
        //     return Review.create({stars: 5})
        // })
        // .then((reviewTwo) => {
        //     return meme.addReview(reviewTwo)
        // })
    })
})
})