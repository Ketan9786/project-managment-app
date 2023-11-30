const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
    fullName:String,
    password:String,
    email:String,
    mobileNumber:Number,
    birthDate:String,
    gender:String
})

const UsersModel = mongoose.model("registeruser",UsersSchema)
module.exports =UsersModel;