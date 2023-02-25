const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    email: String,
    password: String,
    username:String,
    token:String,
    moto:[motoSchema]
})

const motoSchema = mongoose.Schema({
    marque: String,
    millesime: Number,
    cylindree: Number,
    modele: String,

})

const User = mongoose.model('users', usersSchema);
module.exports = User