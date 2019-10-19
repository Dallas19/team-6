const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const reader = require('./utils/FileReader')

app.use(bodyParser.json())
	.use(morgan(':method :url :status :response-time'))
	.use(cors())

app.get('/', (req, res) => {
	res.json('This is the default path')
})

app.get('/readFile', async (req, res) => {
	// reading the first 1000 bytes
	const unitedWayRows = await reader('./United-Way.csv', 0, 999)
	res.json(unitedWayRows)
})

app.listen(5000, () => console.log('Listening on Port 5000'))
