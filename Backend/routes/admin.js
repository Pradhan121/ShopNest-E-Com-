const express = require('express')
const router = express.Router()

const admin = require('../controller/admin')
const { authCheck, adminOnly } = require('../middleware/auth')

router.get("/users", authCheck, adminOnly, admin.getUsers);
router.delete("/users/:id", authCheck, adminOnly, admin.deleteUser);
router.get('/dashboard', authCheck,adminOnly, admin.dashboard)
router.get('/products', authCheck, adminOnly, admin.getProducts)
router.post('/products', authCheck, adminOnly,  admin.addProduct)
router.patch('/products/:id', authCheck, adminOnly,  admin.updateProduct)
router.delete('/products/:id', authCheck, adminOnly,  admin.deleteProduct)
router.get('/orders', authCheck,adminOnly, admin.getOrders)
router.patch('/orders/:id', authCheck, adminOnly,  admin.updateOrder)

module.exports = router;
