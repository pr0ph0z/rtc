let services = require('../services/index')

exports.register = async (req, res, next) => {
  let coll = services.db.collection('test')
  res.send(await coll.find({}).toArray())
}
