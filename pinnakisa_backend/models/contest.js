const mongoose = require('mongoose')

// määrittelee minkä muotoisia olioita tietokannan kokoelmiin talletetaan
const contestSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	date_begin: {
		type: Date,
		required: true
	},
	date_end: {
		type: Date,
		required: true
	},
	url: {
		type: String,
		required: false

	},
	status: {
		type: String,
		required: true
	},

	//Lisätty uutena
	participants: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
]
},
	{
		timestamps: true
	})

// muotoilee mongoosen palauttamat oliot toJson-metodin avulla merkkijonoksi
// sekä poistaa MongoDBn oletusarvoista olioiden muotoilua
contestSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Contest', contestSchema)