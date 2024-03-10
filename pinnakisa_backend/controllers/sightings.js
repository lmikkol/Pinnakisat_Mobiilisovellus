const sightingsRouter = require('express').Router()
const Sighting = require('../models/sighting')
// const User = require('../models/user')

sightingsRouter.get('/', async (request, response) => {
    Sighting.find({}).then(sightings => {
        response.json(sightings)
		})
    // const sightings = await Sighting
	// 	.find({})
})

sightingsRouter.post('/', (request, response, next) => {
	const body = request.body
	console.log(body)


	const sighting = new Sighting({
		region: body.region,
		distanceKM: body.distanceKM,
		hours: body.hours,
		spontaneous: body.spontaneous,
        contest: body.contest,
        userAccount: body.userAccount,
        birdList: body.birdList
	})

	// tallentaa luodun olion tietokantaan
	sighting.save().then(savedSighting => {
		response.json(savedSighting)
	})
		.catch(error => next(error))
})

module.exports = sightingsRouter