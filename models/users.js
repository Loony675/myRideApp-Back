const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    email: String,
    password: String,
    username:String,
    token:String
})

const User = mongoose.model('users', usersSchema);
module.exports = User