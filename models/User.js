const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        username:{type: String, required: true, unique:true,},
        email:{type: String, required: true, unique:true},
        name:{type: String, required: true, unique: false},
        lastname:{type: String, required: true, unique: false},
        password:{type: String},
        salt: String,
        isAdmin:{type: Boolean, default:false},
        product:[
            {
                img:
                {
                    type:String
                },
                price:
                {
                    type:Number
                },
                quantity:
                {
                   type: Number
                },
                title:
                {
                    type: String
                }
            
            }
           ],
        userAddress: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "UserAddress"
        },
        shippingAdress: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'ShippingAdress'
        }

    },{timestamps:true})

    module.exports = mongoose.model("User", userSchema);