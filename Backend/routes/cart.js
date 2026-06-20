const express = require('express')
const router = express.Router()
const {authCheck}  = require('../middleware/auth')

const cart = require('../controller/cart')

router.get('/cart', authCheck, cart.viewCart)
router.post('/cart', authCheck, cart.createCart)
router.patch('/cart', authCheck, cart.updateCart)
router.delete('/cart', authCheck, cart.deleteCart)
module.exports = router