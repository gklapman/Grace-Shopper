'use strict'

const db = require('APP/db')
    , {User, Meme, Review} = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('Review', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('title concats content if empty', () => {
    it('there is no title, content.length > 16', () => {
        let uzer;
        let m3me;
        return User.create({email: 'testingis@2cool.gov'})
        .then(user => {
            uzer = user
            return Meme.create({name: 'Charles On Subway', stock: 49})
        })
        .then(meme => {
            m3me = meme
            return Review.create({content: 'THIS IS THE BEST PRODUCT', stars: 5, user_id: uzer.id, meme_id: m3me.id})
        })
        .then(review => {
            expect(review.title).to.equal('THIS IS THE BES...')
        })
    })
    it('there is no title or content', () => {
        let uzer;
        let m3me;
        return User.create({email: 'testingis@2cool.gov'})
        .then(user => {
            uzer = user
            return Meme.create({name: 'Charles On Subway', stock: 49})
        })
        .then(meme => {
            m3me = meme
            return Review.create({stars: 5, user_id: uzer.id, meme_id: m3me.id})
        })
        .then(review => {
            expect(review.title).to.equal('')
        })
    })
  })
})