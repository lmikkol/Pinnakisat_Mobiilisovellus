const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Contest = require('../models/contest')
const { response } = require('express')


usersRouter.put('/addsighting/:userId', async (req, res) => {
  const userId = req.params.userId;
  const body = req.body
  // const birds = body.sighting.birds

  console.log(body)

  const newSighting = {
    contestId: body.contestId,
    region: body.region,
    distanceKM: body.kilometers,
    hours: body.hours,
    spontaneous: body.spontaneous,
    sightings: body.sightings
  }

  // const newSighting = {
    
  //   contestId: body.contestId,
  //   region: body.sighting.region,
  //   distanceKM: body.sighting.kilometers,
  //   hours: body.sighting.hours,
  //   spontaneous: body.sighting.spontaneous,
  //   birdList: birds
  // }


  console.log(newSighting, "NEWSIHT FROM PAK")

    User.findByIdAndUpdate(userId, { $push: { sightings: { $each: [newSighting] } } }, { new: true })
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
        console.log(updatedUser, "UPDATED")
        return res.json(updatedUser)
      })
      .catch(error => {
        console.error('Error adding user sightings', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      });

})

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
  const users = await User.find({}).populate('contests', { name: 1, description: 1 }).populate('sightings')
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

// usersRouter.get('/findusersightings/:id', async (request, response) => {
//   const id = request.params.id
//   console.log(id, "IDDDDD")

//   try{
//     const userSightings = await User.find({sightins: id}).populate('sightings', {region: 1})

//     return response.status(200).json(userSightings);
//   } catch (error) {
//     console.error('Error searching sightings:', error)
//     response.status(500).json({ message: 'Internal Server Error' })
//   }
// })

module.exports = usersRouter


