const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes/index')
const app = express()
const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
}

app.database = null

app.use(morgan('dev'))
app.use(cors)
app.use(routes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

module.exports = app
