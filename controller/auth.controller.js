require('dotenv').config()
const jwt = require('jsonwebtoken')
const services = require('../services/index')
const utils = require('../utils')
const uuidv1 = require('uuid/v1')
const uuidv3 = require('uuid/v3')

let response = null

exports.register = async (req, res, next) => {
  if (utils.checkBody(req.body, utils.registerBody)) {
    let User = services.db.collection('users')
    let Token = services.db.collection('tokens')

    let uid = uuidv3(req.body.username, uuidv1())
    let token = jwt.sign({
      data: {
        username: req.body.username,
        uid: uid
      }
    }, process.env.SECRET_KEY)

    await User.insertOne({
      uid: uid,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      profile: {
        full_name: req.body.full_name
      },
      token: token
    })

    await Token.insertOne({
      uid: uid,
      token: token,
      created_at: new Date() / 1000 | 0
    })
    response = utils.requestResponse.success
  } else {
    response = utils.requestResponse.incomplete_body
  }

  res.status(response.code).json(response)
}
