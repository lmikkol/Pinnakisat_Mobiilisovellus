const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Contest = require('../models/contest')


// käsittelelee käyttäjätunnuksen luomista
// hashaa salasanan

usersRouter.put('/joincontest/:contestId/:userId', async (req, res) => {
  const contestId = req.params.contestId;
  const userId = req.params.userId;
  // Update the user document by pushing the contest's ID to the contests array
  User.findByIdAndUpdate(userId, { $push: { contests: contestId } }, { new: true }).populate('contests', { name: 1, description: 1 })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json(updatedUser)
    })
    .catch(error => {
      console.error('Error adding user to contest:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    });
})

usersRouter.put('/leavecontest/:contestId/:userId', async (req, res) => {
  const contestId = req.params.contestId;
  const userId = req.params.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { contests: contestId } }, { new: true }).populate('contests', { name: 1, description: 1 })

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(updatedUser);
  } catch (error) {
    console.error('Error leaving contest:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

})


usersRouter.post('/', async (request, response) => {
  console.log(request.body.registerFormData)
  const { email, firstName, lastName, password } = request.body.registerFormData

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
  const users = await User.find({}).populate('contests', { name: 1, description: 1 })
  response.json(users)
})

usersRouter.get('/findusers/:id', async (request, response) => {
  const id = request.params.id
  console.log(id, "ID")

  // const { contestId } = request.query;

  try {
    // Find users who are associated with the given contest ID
    const users = await User.find({contests: id}).populate('contests', { name: 1, description: 1 })

    return response.status(200).json(users);

  } catch (error) {
    console.error('Error searching users:', error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
})

module.exports = usersRouter


