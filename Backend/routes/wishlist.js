const express = require('express');
const { authCheck } = require('../middleware/auth');
const router = express.Router()
const wishlist = require('../controller/wishlist')

router.post("/wishlist",authCheck, wishlist.addWishlist);

router.get("/wishlist",authCheck,wishlist.getWishlist);

router.delete("/wishlist",authCheck,wishlist.removeWishlist);

module.exports = router