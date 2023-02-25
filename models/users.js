const mongoose = require('mongoose')

const motoSchema = mongoose.Schema({
    marque: String,
    millesime: Number,
    cylindree: Number,
    modele: String,

})
const usersSchema = mongoose.Schema({
    email: String,
    password: String,
    username:String,
    token:String,
    moto:[motoSchema]
})



const User = mongoose.model('users', usersSchema);
module.exports = User