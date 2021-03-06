const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes/index')
const mongo = require('./services/mongo')
mongo.createConnection()
const app = express()
const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
}

app.database = null

// app.use(morgan('dev'))
app.use(cors)
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(routes)

module.exports = app
