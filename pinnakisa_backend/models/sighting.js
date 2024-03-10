const mongoose = require('mongoose')

const birdSchema = new mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    name: String, 
    date: String 
})

const sightingSchema = new mongoose.Schema({
    
    region: {
        type: String,
        required: true
    },
    distanceKM: {
        type: String
    },
    hours: {
        type: String
    },
    spontaneous: {
        type: String
    },
    contest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest'
    },
    userAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    birdList: [birdSchema],
})

sightingSchema.set('toJSON', {
    transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
    }
})

module.exports = mongoose.model('Sighting', sightingSchema)