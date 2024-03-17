const sightingsRouter = require('express').Router()
const Sighting = require('../models/sighting')
const User = require('../models/user')

sightingsRouter.get('/', async (request, response) => {
  Sighting.find({}).then(sightings => {
    response.json(sightings)
  })
  // const sightings = await Sighting
  // 	.find({})
})

sightingsRouter.post('/', async (request, response, next) => {
  const body = request.body  

  try {
    // Check if a sighting with the same contestId exists
    let existingSighting = await Sighting.findOne({ contest: body.contestId });
  
    if (existingSighting) {
      // If the sighting exists, update it with the new data
      existingSighting.region = body.region;
      existingSighting.distanceKM = body.kilometers;
      existingSighting.hours = body.hours;
      existingSighting.spontaneous = body.spontaneous;
      existingSighting.birdList = body.birds;
  
      const updatedSighting = await existingSighting.save();
  
      // Update the user's sightings with the updated sighting
      const updatedUser = await User.findByIdAndUpdate(body.userId, { $addToSet: { sightings: updatedSighting.id } }, { new: true }).populate('sightings');
  
      if (!updatedUser) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      return response.json(updatedUser);
    } else {
      // If no existing sighting is found, create a new one
      let newSighting = new Sighting({
        region: body.region,
        distanceKM: body.kilometers,
        hours: body.hours,
        spontaneous: body.spontaneous,
        contest: body.contestId,
        birdList: body.birds
      });
  
      const savedSighting = await newSighting.save();
  
      // Update the user's sightings with the new sighting
      const updatedUser = await User.findByIdAndUpdate(body.userId, { $addToSet: { sightings: savedSighting.id } }, { new: true }).populate('sightings');
  
      if (!updatedUser) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      return response.json(updatedUser);
    }
  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({ error: 'Server error' });
  }
})
 

module.exports = sightingsRouter