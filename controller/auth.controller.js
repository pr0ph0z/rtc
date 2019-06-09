require('dotenv').config()
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId
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
    response = Object.assign(utils.requestResponse.success, { token: token })
  } else {
    response = utils.requestResponse.incomplete_body
  }

  res.status(response.code).json(response)
}

exports.login = async (req, res, next) => {
  if (utils.checkBody(req.body, utils.loginBody)) {
    let User = services.db.collection('users')
    let Token = services.db.collection('tokens')
    let findUser = await User.findOne({
      username: req.body.username,
      password: req.body.password
    })

    if (findUser !== null) {
      let token = jwt.sign({
        data: {
          username: findUser.username,
          uid: findUser.uid
        }
      }, process.env.SECRET_KEY)

      await User.updateOne(
        { _id: ObjectId(findUser._id) },
        { $set: { token: token } },
        { upsert: false }
      )

      await Token.insertOne({
        uid: findUser.uid,
        token: token,
        created_at: new Date() / 1000 | 0
      })

      response = Object.assign(utils.requestResponse.success, { token: token })
    } else {
      response = utils.requestResponse.unauthorized
    }
  } else {
    response = utils.requestResponse.incomplete_body
  }

  res.status(response.code).json(response)
}
