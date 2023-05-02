const mongoose = require('mongoose')

const userAddress = new mongoose.Schema({
    flatNumber: {type: String, required: false},
    nearByMark: {type: String, required: true},
    fullAddress: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    altPhoneNumber:  {type: String, required: false},
    pinCode: {type: String, required: true},
    state:{type: String, required: true},
    userSchema:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("UserAddress", userAddress)