const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const mongoConnection = require('./config')
const reader = require('./utils/FileReader')

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
	res.json('This is the default path')
})

app.get('/readFile', async (req, res) => {
	// reading the first 73 complete rows of data
	const unitedWayRows = await reader('./United-Way.csv', 0, 40000)
	res.json(unitedWayRows)
})

app.listen(5000, () => console.log('Listening on Port 5000'))
