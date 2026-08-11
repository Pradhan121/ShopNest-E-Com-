const express = require('express')
const router = express.Router()
const multer = require('multer')
const admin = require('../controller/admin')
const { authCheck, adminOnly } = require('../middleware/auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })


router.get("/users", authCheck, adminOnly, admin.getUsers);
router.delete("/users/:id", authCheck, adminOnly, admin.deleteUser);
router.get('/dashboard', authCheck,adminOnly, admin.dashboard)
router.get('/products', authCheck, adminOnly, admin.getProducts)
router.post('/products', authCheck, adminOnly, upload.single('image'),  admin.addProduct)
router.patch('/products/:id', authCheck, adminOnly, upload.single('image'),  admin.updateProduct)
router.delete('/products/:id', authCheck, adminOnly,  admin.deleteProduct)
router.get('/orders', authCheck,adminOnly, admin.getOrders)
router.patch('/orders/:id', authCheck, adminOnly,  admin.updateOrder)

module.exports = router;
