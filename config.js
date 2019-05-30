require('dotenv').config()

const mongoDevelopmentServer = process.env.MONGO_DEV
const mongoProductionServer = process.env.MONGO_PROD
const mongoURL = process.env.NODE_ENV === 'production' ? mongoProductionServer : mongoDevelopmentServer

module.exports = {
  mongoDevelopmentServer,
  mongoProductionServer,
  mongoURL
}
