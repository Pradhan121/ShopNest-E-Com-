const express = require('express')
const router = express.Router()

const auth = require('../controller/auth')
const { authCheck } = require('../middleware/auth')

router.post('/register',  auth.register)
router.post('/login', auth.login)
router.get('/get',authCheck, auth.getUser)

module.exports = router