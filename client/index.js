const AppServer = require('./app')
const mongo = require('./services/mongo')

AppServer.listen(3000, async () => {
  mongo.createConnection()
})
