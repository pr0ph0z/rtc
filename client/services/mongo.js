const mongo = require('mongodb').MongoClient
const config = require('../config')
let services = require('./index')

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
    services.db = connection.db(process.env.MONGO_NAME)
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  createConnection
}
