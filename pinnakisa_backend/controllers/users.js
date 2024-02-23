const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


// käsittelelee käyttäjätunnuksen luomista
// hashaa salasanan
usersRouter.post('/', async (request, response) => {
  const { email, firstName, lastName, password } = request.body
 
//   if(email === process.env.ADMIN_EMAIL) {
    
//   }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
//    const role = 0

  const user = new User({
    email,
    firstName,
    lastName,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
  })

module.exports = usersRouter