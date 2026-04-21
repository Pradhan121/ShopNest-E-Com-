const express = require('express')
const router = express.Router()

const cart = require('../controller/cart')

router.get('/cart', cart.viewCart)
router.post('/cart', cart.createCart)
router.delete('/cart', cart.deleteCart)
router.patch('/cart', cart.updateCart)

module.exports = router