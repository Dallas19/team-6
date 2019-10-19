const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const mongoConnection = require('./config')
const reader = require('./utils/FileReader')
const performance = require('./models/performance')
const getThreeMonths = require('./utils/GetThreeMonths')

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

app.get('/reqPoints', async (req, res) => {
	const { startMonth, loggedIn, strategy, indicator } = req.query
	const [month1, month2, month3] = getThreeMonths(startMonth)
	let dataPoints
	try {
		// add the filter
		dataPoints = await performance
			.find(
				{
					Strategy_ID: parseInt(strategy),
					Outcome_Indicator_ID: parseInt(indicator)
				},
				{
					_id: 0,
					['Unique Count ' + month1 + ' 2019']: 1,
					['Unique Count ' + month2 + ' 2019']: 1,
					['Unique Count ' + month3 + ' 2019']: 1,
					Program_Name: 1,
					Agency_Name: 1,
					'Annual Target 2019 (if applicable)': 1
				}
			)
			.exec()
		// sremove certain keys for external viewers
		if (loggedIn === 'true') {
			dataPoints = dataPoints.map(dataPoint => {
				let obj = { ...dataPoint }

				delete obj['Program_Name']
				delete obj['Agency_Name']

				return obj
			})
		}
	} catch (err) {
		console.log('Error: ', err)
	}
	res.json(dataPoints)
})

app.listen(5000, () => console.log('Listening on Port 5000'))
