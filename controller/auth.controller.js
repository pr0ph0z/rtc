const services = require('../services/index')
const utils = require('../utils')

let response = null

exports.register = async (req, res, next) => {
  if (utils.checkBody(req.body, utils.registerBody)) {
    let User = services.db.collection('test')
    await User.insertOne({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      profile: {
        full_name: req.body.full_name
      }
    })
    response = utils.requestResponse.success
  } else {
    response = utils.requestResponse.incomplete_body
  }

  res.status(response.code).json(response)
}
