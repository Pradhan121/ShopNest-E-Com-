const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    category: String,
    rating: Number,
    image: String,
    stock: Number,
    createdAt: Date
})
module.exports = mongoose.model('Product', productSchema)