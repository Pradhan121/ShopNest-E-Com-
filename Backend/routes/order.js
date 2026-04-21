const express = require('express')
const router = express.Router()

const order = require('../controller/order')

router.get('/order', order.viewOrder)
router.post('/order', order.createOrder)
router.delete('/order', order.deleteOrder)
router.patch('/order', order.updateOrder)

module.exports = router