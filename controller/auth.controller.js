const services = require('../services/index')
const utils = require('../utils')

let response = null

exports.register = async (req, res, next) => {
  if (utils.checkBody(req.body, utils.registerBody)) {
    console.log(req.body)
    console.log(utils.registerBody)
    response = utils.requestResponse.success
  } else {
    response = utils.requestResponse.body_incomplete
  }

  res.json(response)
}
