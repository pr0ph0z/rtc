const AppServer = require('./app')

AppServer.listen(3000, async () => {
  AppServer.database = await require('./services/mongo').createConnection()
})
