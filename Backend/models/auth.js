const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: {
       type: String,
       enum: ["user", "admin"],
       default: 'user'
    }
})
module.exports = mongoose.model('Auth', authSchema)