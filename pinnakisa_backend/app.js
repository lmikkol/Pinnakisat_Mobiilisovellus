const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const contestRouter = require('./controllers/contests')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const sightingsRouter = require('./controllers/sightings')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const Contest = require('./models/contest')


async function updateProjectStatus() {
  const nowDate = new Date()
  try {
      // Find the project and update its status
      const project = await Contest.findOneAndUpdate(
       { $and: [
          { date_end: {$lt: nowDate} },
           { status: {$not:{ $eq: "archived" } } }
        ]},
          { $set: { status: 'archived' } },
          { new: true }
      );

      if (project) {
          console.log('Contest status updated to archived successfully:', project);
      } else {
          console.log('Contest not archived not found.');
      }
  } catch (error) {
      console.error('Error updating project status:', error);
  }
}

async function updateStatusToActive() {
  const nowDate = new Date()
  try {
      // Find the project and update its status
      const project = await Contest.findOneAndUpdate(
       { $and: [
          { date_end: {$gt: nowDate} },
          {date_start: {$lte: nowDate}},
           { status: {$not:{ $eq: "active" } } }
        ]},
          { $set: { status: 'active' } }
      );

      if (project) {
          console.log('Contests status updated to active successfully:', project);
      } else {
          console.log('Contests not active not found.');
      }
  } catch (error) {
      console.error('Error updating project status:', error);
  }
}


mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(async () => {
    logger.info('connected to MongoDB')
    await updateProjectStatus();
    await updateStatusToActive();
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/contests', contestRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/sightings', sightingsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
