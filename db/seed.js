'use strict'

const db = require('APP/db')
    , {User, Thing, Favorite, Promise, Review} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    things: things(),
  }

  seeded.favorites = favorites(seeded)

  return Promise.props(seeded)
}

const tags = seed(tags,{
  theoffice: { name: 'The Office'},
  funny: { name: 'funny'},
  michalscott: {michaelscott: 'Michael Scott'}
})

const users = seed(User, {
  donald: {
    name: 'Mr.Presidnet',
    email: 'donald@trump.com',
    password: '1234',
    salt: 'hackers',
    address: '1600 Penn Ave',
    admin: true,

  },
  obama: {
    name: 'Barack Obama',
    email: 'barack@example.gov',
    password: '1234',
    salt: 'americanpie',
    address: 'somewhere far away',
    admin: false
  },
})



//userBelongsToManyMeMe


// const users = seed(User, {
//   god: {
//     email: 'god@example.com',
//     name: 'So many names',
//     password: '1234',
//   },
//   barack: {
//     name: 'Barack Obama',
//     email: 'barack@example.gov',
//     password: '1234'
//   },
// })

const memes = seed(meme, {
  michael: {
    name: 'michael',
    price: 9.99,
    rating: 4,
    photo:'http://4.bp.blogspot.com/-pFRXzhUqYb0/VZNw_h4OTCI/AAAAAAAAEVQ/S94m3_LRK0A/s320/FEARED%2BOR%2BLOVED.jpg',
    product_info:'This feature michael scott meme is from The Fight eppisode (ep 6 ) season 2 ',
    stock: 2
  },
  dwight: {
    name: 'dwight',
    price: 7.99,
    rating: 2,
    photo:'http://4.bp.blogspot.com/-pFRXzhUqYb0/VZNw_h4OTCI/AAAAAAAAEVQ/S94m3_LRK0A/s320/FEARED%2BOR%2BLOVED.jpg',
    product_info:'Dwight here is talking about stuff from his Farm... ',
    stock: 4
  },
  jim: {
    name: 'jim',
    price: 7.99,
    rating: 2,
    photo:'http://s2.quickmeme.com/img/ae/ae150e79fb32592c6671db823eec58a4a7f6cd7a14847e600154ddf92e19c078.jpg',
    product_info:'Jim product information here blah blha blah  ',
    stock: 2
    },
})

const things = seed(Thing, { //memes
  surfing: {name: 'surfing'},
  smiting: {name: 'smiting'},
  puppies: {name: 'puppies'},
})


const reviews = seed(Review, ({memes, users}) => ({
  content: 'this here is a smashing meme',
  title: 'superb',
  stars: 5,
  meme_id: memes.dwight.id,
  user_id: users.donald.id,

}))





const favorites = seed(Favorite,
  // We're specifying a function here, rather than just a rows object.
  // Using a function lets us receive the previously-seeded rows (the seed
  // function does this wiring for us).
  //
  // This lets us reference previously-created rows in order to create the join
  // rows. We can reference them by the names we used above (which is why we used
  // Objects above, rather than just arrays).
  ({users, things}) => ({
    // The easiest way to seed associations seems to be to just create rows
    // in the join table.
    'obama loves surfing': {
      user_id: users.barack.id,    // users.barack is an instance of the User model
                                   // that we created in the user seed above.
                                   // The seed function wires the promises so that it'll
                                   // have been created already.
      thing_id: things.surfing.id  // Same thing for things.
    },
    'god is into smiting': {
      user_id: users.god.id,
      thing_id: things.smiting.id
    },
    'obama loves puppies': {
      user_id: users.barack.id,
      thing_id: things.puppies.id
    },
    'god loves puppies': {
      user_id: users.god.id,
      thing_id: things.puppies.id
    },
  })
)

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, things, favorites})

