const express = require('express')
const router = express.Router()
const profile = require('../controller/profile')
const { authCheck } = require('../middleware/auth')

router.get('/profile', authCheck, profile.getProfile)
router.patch('/profile/:id', authCheck, profile.updateProfile)

module.exports = router

