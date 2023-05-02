const router = require('express').Router()
const mongoose = require('mongoose')
const razorpay = require('razorpay')
const dotenv = require('dotenv')
const User = require('../../models/User')
const crypto = require("crypto")

dotenv.config();

const createPaymentInstance = new razorpay({
    key_id: process.env.KeyId,
    key_secret: process.env.KeySecret
})

router.post('/createpayment', async (req, res) => {
     const {username,  amount, currency, receipt, notes} = req.body;
     try
     {
        const FindUserByNumber = await User.findOne({username: username})
        if(FindUserByNumber != null)
        {
           createPaymentInstance.orders.create({amount, currency}, 
               (err, order) => {
                   if(!err){
                       res.status(200).json(order)
                   }
                   else{
                       res.status(401).json(err)
                   }
               })
        }
     }
     catch(err)
     {
        console.log(err)
        res.status(400).json()
     }

})

router.post("/success", async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        console.log(req.body)

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", process.env.KeySecret);
        
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");
         console.log(digest)
         console.log(razorpaySignature)
        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router