const express = require('express')
const router = express.Router()

let AuthController = require('../controller/auth.controller')

router.post('/register', AuthController.register)

module.exports = router
