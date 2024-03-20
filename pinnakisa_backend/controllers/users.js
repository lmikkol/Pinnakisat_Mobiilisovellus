const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Contest = require('../models/contest')
const Sighting = require('../models/sighting')


usersRouter.put('/addsighting/:userId', async (req, res) => {
  const userId = req.params.userId;
  const body = req.body
  const newSighting = {
    contestId: body.contestId,
    region: body.region,
    distanceKM: body.kilometers,
    hours: body.hours,
    spontaneous: body.spontaneous,
    sightings: body.sightings
  }
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
    Sighting.findOneAndDelete({ userId: userId, contestId: contestId}) // Find and delete the sighting with the given ID
  .then(removedSighting => {
    if (removedSighting) {
      console.log('Sighting removed:', removedSighting);
      // Now update the corresponding contest to remove the sighting ID from its sightings array
      return Contest.findOneAndUpdate(
        { _id: contestId }, // Query condition to find the contest with the matching contestId
        { $pull: { sightings: removedSighting.id } }, // Remove the sighting ID from the sightings array
        { new: true } // Return the updated contest document
      );
    } else {
      console.log('No matching sighting found.');
      return null; // Return null if no matching sighting was found
    }
  })
  .then(updatedContest => {
    if (updatedContest) {
      console.log('Contest updated:', updatedContest);
    } else {
      console.log('No contest updated.');
    }
  })
  .catch(error => {
    console.error('Error removing sighting and updating contest:', error);
  })


    return res.json(updatedUser);
  } catch (error) {
    console.error('Error leaving contest:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

})

usersRouter.post('/', async (request, response) => {
  console.log(request.body.registerFormData)
  const { email, firstName, lastName, password } = request.body.registerFormData


  if (!isValidPassword(password)) {
    return response.status(400).json({ error: 'Invalid password. Password must contain at least 4 letters and 1 digit' });
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    email,
    firstName,
    lastName,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

function isValidPassword(password) {
  // Password must contain at least 4 letters, 1 digit, and 1 special character
  return /^(?=.*[A-Za-z]{4,})(?=.*\d).{6,}$/.test(password);
}

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('contests', { name: 1, description: 1 }).populate('sightings')
  response.json(users)
})

usersRouter.get('/findusers/:id', async (request, response) => {
  const id = request.params.id

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




