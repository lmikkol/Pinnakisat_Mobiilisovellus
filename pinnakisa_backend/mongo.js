const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]

const url =
	`mongodb+srv://KuumaTanssi:${password}@cluster0.rbci3un.mongodb.net/pinnakisat?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

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
	}
},
	{
		timestamps: true
	})

const Contest = mongoose.model('Contest', contestSchema)

const contest = new Contest({
	name: "Talvipihapinnakisa 2021 - 2022",
	description: "Jo 16. perättäinen talvipihapinnakisa. PiLYn toiminta-alueella...",
	date_begin: "2021-12-01",
	date_end: "2022-02-28",
	url: "http://www.pily.fi/event/talvipihapinnakisa-ja-talvikauden-lajien-laskenta-pirkanmaalla-alkavat-tiistaina-1-12-osallistu-sinakin/",
	status: "archived"
})

// contest.save().then(result => {
// 	console.log('contest saved!')
// 	mongoose.connection.close()
// })

Contest.find({}).then(result => {
	result.forEach(contest => {
		console.log(contest)
	})
	mongoose.connection.close()
})