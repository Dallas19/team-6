const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const mongoConnection = require('./config')
const reader = require('./utils/FileReader')
const performance = require('./models/performance')

app.use(bodyParser.json())
	.use(morgan(':method :url :status :response-time'))
	.use(cors())

mongoose
	.connect(mongoConnection, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.catch(console.log)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('db connected!'))

app.get('/', (req, res) => {
	res.json({
		isLoggedIn: false
	})
})

app.get('/login', (req, res) => {
	res.json({
		isLoggedIn: true
	})
})

// only once to populate the db
app.get('/readFile', async (req, res) => {
	// reading the first 73 complete rows of data
	const unitedWayRows = await reader('./United-Way.csv', 0, 40000)
	const completeUnitedWayRows = unitedWayRows.slice(0, 73)
	completeUnitedWayRows.forEach(async row => {
		try {
			// prettier-ignore
			await performance.replaceOne({ "Sort Order": row['Sort Order'] }, row, { upsert: true }, err => {
					if (err) throw err
				}
			)
		} catch (err) {
			console.log(err)
		}
	})
	res.json(completeUnitedWayRows)
})

app.listen(5000, () => console.log('Listening on Port 5000'))
