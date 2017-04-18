'use strict'

const db = require('APP/db')
    , {Meme, Review, User} = db
    , {expect} = require('chai')

describe('Meme', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('tests for memes', () => {
      let meme;
      let user;
      let user2;
      beforeEach(() => {
          return Meme.create({name: 'charlesOnSubway', price: 60.40, stock: 40})
          .then((memez) => {
              meme = memez
              return User.create({email: 'butts@gmail.org'})
          })
          .then((userz) => {
              user = userz
            //   console.log('user', user.id)
              return User.create({email: 'hey@guys.biz'})
          })
          .then((arnodl) => {
              user2 = arnodl
            //   console.log('user2', user2.id)
          })
      })
      afterEach('Clear the tables', () => db.truncate({ cascade: true }))
      it('price is stored correctly', () => {
          expect(meme.price).to.equal('60.40')
      })
    it('rating', () => {
        return meme.createReview({stars: 1, title: 'hell', user_id: user.id})
        .then(review => {
            return meme.getReviews()
        })
        .then(returned => {
            return meme.createReview({stars: 5, title: 'hell pt 2', user_id: user2.id})
        })
        .then(() => {
            return meme.rating
        })
        .then((hooked) => {
            expect(hooked).to.equal('3.00')
        })
    })
})
})