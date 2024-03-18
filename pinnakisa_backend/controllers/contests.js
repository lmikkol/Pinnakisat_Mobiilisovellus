const contestRouter = require('express').Router()
const Contest = require('../models/contest')
const User = require('../models/user')
// kysely, joka hakee kaikki tauluun lisätyt kilpailut

contestRouter.get('/', async (request, response) => {
	// Contest.find({}).then(contests => {
		// })
		const contests = await Contest
		.find({}).sort([['date_end', -1]]);
		response.json(contests)
})


/// MUUTA TÄMÄ KOKONAAN
contestRouter.put('/contest/:contestId/adduser/:userId', (req, res) => {
    const contestId = req.params.contestId;
    const userId = req.params.userId;

    console.log(contestId, userId, "BÄÄKKK")
  
    // Update the contest document by pushing the user's ID to the users array
    Contest.findByIdAndUpdate(contestId, { $push: { participants: userId } }, { new: true }).populate('participants', { email: 1, firstName: 1 })
      .then(updatedContest => {
		console.log(updatedContest.populated('participants')) // null
        if (!updatedContest) {
          return res.status(404).json({ message: 'Contest not found' });
        }
  
        // Update the user document by pushing the contest's ID to the contests array
        User.findByIdAndUpdate(userId, { $push: { contests: contestId } }, { new: true }).populate('contests', {name: 1, description: 1})
      }).then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        response.json(updatedUser) 
      })
      .catch(error => {
        console.error('Error adding user to contest:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      });
  });

// kysely kilpailujen lisäykselle
contestRouter.post('/', (request, response, next) => {
	const body = request.body
	console.log(body, "CONTEST BAK FOR vertailu")


	const contest = new Contest({
		name: body.name,
		description: body.description,
		date_begin: body.date_begin,
		date_end: body.date_end,
		url: body.url,
		status: body.status
	})

	console.log(body.status, "STATUS BÄKISTÄ!")

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
			response.status(404).end()
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