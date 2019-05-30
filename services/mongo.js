const mongo = require('mongodb').MongoClient
const app = require('../app')
const config = require('../config')

const createConnection = async () => {
  const options = {
    connectTimeoutMS: 15000,
    keepAlive: 15000,
    socketTimeoutMS: 15000,
    poolSize: 50,
    useNewUrlParser: true
  }

  try {
    const connection = await mongo.connect(config.mongoURL, options)
    app.database = connection
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  createConnection
}
