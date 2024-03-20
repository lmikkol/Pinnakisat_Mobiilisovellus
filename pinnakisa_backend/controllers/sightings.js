const sightingsRouter = require('express').Router()
const Sighting = require('../models/sighting')
const User = require('../models/user')
const Contest = require('../models/contest')

sightingsRouter.get('/', async (request, response) => {
  Sighting.find({}).populate('userId', {firstname: 1, lastname: 1}).then(sightings => {
    response.json(sightings)
  })
})

sightingsRouter.post('/', async (request, response, next) => {
  const body = request.body  


  try {
    // Check if a sighting with the same contestId exists
    let existingSighting = await Sighting.findOne({ userId: body.userId, contestId: body.contestId });

    if (existingSighting) {
      console.log("VANHA LÖYTYI BÄKISTÄ")
      // If the sighting exists, update it with the new data
      existingSighting.userId = body.userId;
      existingSighting.contestId = body.contestId;
      existingSighting.region = body.region;
      existingSighting.distanceKM = body.kilometers;
      existingSighting.hours = body.hours;
      existingSighting.spontaneous = body.spontaneous;
      existingSighting.birdList = body.birds;
  
      const updatedSighting = await existingSighting.save();
      const newContest = await Contest.findOne({
        _id: body.contestId,
        sightings: updatedSighting.id
      }).populate('sightings');


      if (!newContest) {
        return response.status(404).json({ message: 'Contest not found' });
      }
      return response.json(newContest);


    } else {
      // If no existing sighting is found, create a new one
      let newSighting = new Sighting({
        userId: body.userId,
        contestId: body.contestId,
        region: body.region,
        distanceKM: body.kilometers,
        hours: body.hours,
        spontaneous: body.spontaneous,
        birdList: body.birds
      });
  
      const savedSighting = await newSighting.save();
  
      // Update the user's sightings with the new sighting
      const updatedContest = await Contest.findByIdAndUpdate(body.contestId, { $addToSet: { sightings: savedSighting.id } }, { new: true })
      .populate({
          path: 'sightings',
          populate: {
            path: 'userId',
            model: 'User',
            select: 'firstName lastName' // Specify the fields you want to select from the User model
          }
          })
  
      if (!updatedContest) {
        return response.status(404).json({ message: 'Contest not found' });
      }
  
      return response.json(updatedContest);
    }
  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({ error: 'Server error' });
  }
})
 

module.exports = sightingsRouter