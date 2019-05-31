
exports.register = async (req, res, next) => {
  const db = require('../app').database
  let testColl = db.collection('test')
  res.send(await testColl.find().toArray())
}
