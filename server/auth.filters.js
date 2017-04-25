const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (Number(req.params.userId) !== req.user.id) {
    return res.send(`You can only ${action} yourself.`)
  }
  next()
}

const forbidden = message => (req, res) => {
  res.status(403).send(message)
}

const isAdmin = message => (req, res, next) => {
	if (!req.user){
		res.send('please log in as an admin for this capability')
	}
	if (!req.user.admin){
		res.send(message)	
	}
}



module.exports = {mustBeLoggedIn, selfOnly, forbidden, isAdmin}
