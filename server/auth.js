const app = require('APP'), {env, secretsFile} = app
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')

const {User, OAuth} = require('APP/db')
const auth = require('express').Router()

/*************************
 * Auth strategies
 *
 * The OAuth model knows how to configure Passport middleware.
 * To enable an auth strategy, ensure that the appropriate
 * environment variables are set.
 *
 * You can do it on the command line:
 *
 *   FACEBOOK_CLIENT_ID=abcd FACEBOOK_CLIENT_SECRET=1234 npm run dev
 *
 * Or, better, you can create a ~/.$your_app_name.env.json file in
 * your home directory, and set them in there:
 *
 * {
 *   FACEBOOK_CLIENT_ID: 'abcd',
 *   FACEBOOK_CLIENT_SECRET: '1234',
 * }
 *
 * Concentrating your secrets this way will make it less likely that you
 * accidentally push them to Github, for example.
 *
 * When you deploy to production, you'll need to set up these environment
 * variables with your hosting provider.
 **/
 
// Facebook needs the FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET
// environment variables.
 OAuth.setupStrategy({
  provider: 'facebook',
  strategy: require('passport-facebook').Strategy,
  config: {
    clientID: secretsFile.FACEBOOK_CLIENT_ID,
    clientSecret: secretsFile.FACEBOOK_CLIENT_SECRET,
    callbackURL: `https://localhost:1337/api/auth/login/facebook`,
  },
  passport
})

// Google needs the GOOGLE_CLIENT_SECRET AND GOOGLE_CLIENT_ID
// environment variables.
// console.log("ENV", env)
// console.log('env google', secretsFile.GOOGLE_CLIENT_ID)
// console.log('process home', process.env.HOME)
// console.log('secretsfile', secretsFile)

OAuth.setupStrategy({
  provider: 'google',
  strategy: require('passport-google-oauth').OAuth2Strategy,
  config: {
    clientID: secretsFile.GOOGLE_CLIENT_ID,
    clientSecret: secretsFile.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:1337/api/auth/login/google`,
  },
  passport
})

// Github needs the GITHUB_CLIENT_ID AND GITHUB_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'github',
  strategy: require('passport-github2').Strategy,
  config: {
    clientID: secretsFile.GITHUB_CLIENT_ID,
    clientSecret: secretsFile.GITHUB_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/github`,
  },
  passport
})

// Other passport configuration:
// Passport review in the Week 6 Concept Review:
// https://docs.google.com/document/d/1MHS7DzzXKZvR6MkL8VWdCxohFJHGgdms71XNLIET52Q/edit?usp=sharing
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(
  (id, done) => {
    debug('will deserialize user.id=%d', id)
    User.findById(id)
      .then(user => {
        if (!user) debug('deserialize retrieved null user for id=%d', id)
        else debug('deserialize did ok user.id=%d', id)
        done(null, user) //set req.User = user
      })
      .catch(err => {
        debug('deserialize did fail err=%s', err)
        done(err)
      })
  }
)

// require.('passport-local').Strategy => a function we can use as a constructor, that takes in a callback
passport.use(
  new (require('passport-local').Strategy)({
    usernameField: 'email',
  },
  
  (email, password, done) => {
    console.log('inside of path')
    debug('will authenticate user(email: "%s")', email)
    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          debug('authenticate user(email: "%s") did fail: no such user', email)
          return done(null, false, { message: 'Login incorrect' })
        }
        return user.authenticate(password)
          .then(ok => {
            if (!ok) {
              debug('authenticate user(email: "%s") did fail: bad password')
              return done(null, false, { message: 'Login incorrect' })
            }
            debug('authenticate user(email: "%s") did ok: user.id=%d', email, user.id)
            done(null, user) //req.user = user && sets a cookie with the userid
          })
      })
      .catch(done)
  }
)
  )

auth.get('/whoami', (req, res) => res.send(req.user))

// POST requests for local login:
auth.post('/login/local', function(req, res, next){
  console.log('inside of local ', req.body)
  return passport.authenticate('local', function(err, user){
    if (user){
      req.logIn(user, function(err){
      console.log('user', user)
      console.log('req.user', req.user)
        return res.json(req.user)
      })

    } else if (err || !user) {
      console.log('err', err)
    }
  })
  (req, res, next)
}
)


// GET requests for OAuth login:
// Register this route as a callback URL with OAuth provider
auth.get('/login/:strategy', (req, res, next) =>
  {console.log('we are inside the correct route')
  return passport.authenticate(req.params.strategy, {
    scope: 'email', // You may want to ask for additional OAuth scopes. These are
                    // provider specific, and let you access additional data (like
                    // their friends or email), or perform actions on their behalf.
    successRedirect: '/',
    // Specify other config here
  })(req, res, next)
}
)

auth.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/api/auth/whoami')
})

auth.post('/signup', (req, res, next) => {
  console.log('req.body', req.body)
  //Can add something that checks if the user exists
  return User.create({
    email: req.body.email, 
    password: req.body.password,
    name: req.body.name, 
    address: req.body.address,
  })
  .then(()=> {
    res.send();
  })
  .catch(err => console.error(err))
})

module.exports = auth
