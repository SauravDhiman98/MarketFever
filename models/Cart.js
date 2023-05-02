const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema(

    {
        username:
        {
            type: String,
            
        },
            img:
            {
                type:String,
            
            },
            price:
            {
                type:Number,
                
            },
            quantity:
            {
               type: Number,
              
            },
            title:
            {
                type: String,
                
            }

    },{timestamps:true})

    module.exports = mongoose.model("Cart", CartSchema);