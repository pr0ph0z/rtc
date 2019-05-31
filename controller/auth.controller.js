class AuthController {
  constructor () {
    this.database = require('../app').database
  }

  register (req, res, next) {
    res.send('wakkwa')
  }
}

module.exports = AuthController
