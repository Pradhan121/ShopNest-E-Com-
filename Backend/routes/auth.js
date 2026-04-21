const express = require('express')
const router = express.Router()

const auth = require('../controller/auth')

router.post('/register',  auth.register)
router.post('/login', auth.login)
router.get('/get', auth.getUser)

module.exports = router