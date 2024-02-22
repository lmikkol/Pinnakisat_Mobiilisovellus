const contestRouter = require('express').Router()
const Contest = require('../models/contest')

// kysely, joka hakee kaikki tauluun lisätyt kilpailut
contestRouter.get('/', (request, response) => {
	Contest.find({}).then(contests => {
		response.json(contests)
	})
})

// kysely kilpailujen lisäykselle
contestRouter.post('/', (request, response, next) => {
	const body = request.body
	console.log(body)


	const contest = new Contest({
		name: body.name,
		description: body.description,
		date_begin: body.date_begin,
		date_end: body.date_end,
		url: body.url,
		status: body.status
	})

	// tallentaa luodun olion tietokantaan
	contest.save().then(savedContest => {
		response.json(savedContest)
	})
		.catch(error => next(error))
})

// kysely jolla haetaan yksittäisiä kilpailuja ID:llä
contestRouter.get('/:id', (request, response) => {
	// const id = request.params.id
	// const contest = contests.find(contest => contest.id === id)
	Contest.findById(request.params.id).then(contest => {
		if (contest) {
			response.json(contest)
		} else {
			response.status(404).end
		}
	})
})

// tietokannasta poistaminen
contestRouter.delete('/:id', (request, response) => {
	Contest.findByIdAndDelete(request.params.id)
		.then(result => {
			response.status(204).end()
		})
})

module.exports = contestRouter 