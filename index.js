const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())
	.use(morgan(':method :url :status :response-time'))
	.use(cors())

app.get('/', (req, res) => {
	res.json('Hello World')
})

app.listen(5000, () => console.log('Listening on Port 5000'))
