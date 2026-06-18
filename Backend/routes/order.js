const express = require('express')
const router = express.Router()

const order = require('../controller/order')
const { authCheck } = require('../middleware/auth')

router.get('/order', authCheck, order.viewOrder)
router.post('/order', authCheck, order.createOrder)
router.delete('/order/:id',authCheck, order.deleteOrder)
router.patch('/order/:id', authCheck, order.updateOrder)

module.exports = router