const mongoose = require('mongoose')

const wishlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        }
    ]
  },  { timestamps: true}
)

module.exports = mongoose.model('Wishlist',wishlistSchema)