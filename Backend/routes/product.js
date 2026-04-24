const express = require('express')
const router = express.Router()
const multer = require('multer')
const product = require('../controller/product')
const {authCheck, adminOnly}  = require('../middleware/auth')

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

router.get('/product', product.viewProduct)
router.post('/product', authCheck, adminOnly,  upload.single('image'), product.createProduct)
router.get('/product/:id', product.getSingleProduct)
router.patch('/product/:id', product.updateProduct)
router.delete('/product/:id', product.deleteProduct)

module.exports = router