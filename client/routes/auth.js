const express = require('express')
const router = express.Router()

let AuthController = require('../controller/auth.controller')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

module.exports = router
