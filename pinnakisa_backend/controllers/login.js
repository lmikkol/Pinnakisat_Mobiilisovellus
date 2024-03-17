const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// Vastaa käyttäjän sisäänkirjautumisesta
loginRouter.post('/', async (request, response) => {
    console.log(request.body.loginFormData)

  const {email, password} = request.body.loginFormData

  const user = await User.findOne({ email }).populate('sightings')
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  }

  // luo käyttäjälle auto-generoidun tokenin
  const token = jwt.sign(
    userForToken,
     process.env.SECRET,
     { expiresIn: 60*60})

    console.log("TOKEENN", token)
  response
    .status(200)
    .send({ token, name: user.email, userRole: user.role, id: user._id, contests: user.contests, sightings:user.sightings})
})

module.exports = loginRouter