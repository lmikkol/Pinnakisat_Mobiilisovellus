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
  console.log(body, "controllerissa")

  const user = await User.findById(body.userId)
  
  let sighting = new Sighting({
     region: body.region,
     distanceKM: body.kilometers,
     hours: body.hours,
     spontaneous: body.spontaneous,
     contest: body.contestId,
     birdList: body.birds
   })

  // // tallentaa luodun olion tietokantaan
  //   .catch(error => {
  //     console.error("Error:", error)
  //     response.status(500).json({ error: 'Server error' });
  //   });

  const savedSighting = await sighting.save()
  user.sightings = user.sightings.concat(savedSighting._id)  
  await user.save()
  console.log(savedSighting)
  response.json(savedSighting)
})

module.exports = sightingsRouter