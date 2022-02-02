let mongoose = require("mongoose")
const Schema = mongoose.Schema
let bcrypt = require("bcrypt")

const UserSchema = Schema ({
    email: String,
    password: String
})

module.exports = mongoose.model('user', UserSchema)