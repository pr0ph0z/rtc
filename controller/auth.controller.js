let database = null
setTimeout(() => {
  database = require('../app').database
}, 1000)
exports.register = async (req, res, next) => {
  database = require('../app').database
  console.log(database)
  // let testColl = database.collection('test')
  // res.json(await testColl.find({}).toArray())
  res.send('wokaw')
}
