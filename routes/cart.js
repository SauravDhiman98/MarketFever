const router = require('express').Router();
const User = require('../models/User');
const Cart = require('../models/Cart')

router.post('/updateuser',  async (req, res) => 
{
    try{
        const findUserByUserName = await  User.findOne({username: req.body.username})
        if(findUserByUserName != null){
            const Value = new Cart ( {
                username:req.body.username,
                img:req.body.img,
                price:req.body.price,
                quantity:req.body.quantity,
                title:req.body.title, 
            }
            )
        const productData = {
            img:req.body.img,
            price:req.body.price,
            quantity:req.body.quantity,
            title:req.body.title, 
        }
         findUserByUserName.product.push(productData)
         await findUserByUserName.save();
         const savedValue = await Value.save();
         findUserByUserName.password = null;
         findUserByUserName.salt = null
        res.status(201).json(findUserByUserName);
        }
        else{
            res.status(204).json({Err: "no Data"})
        }
    }
    catch(err)
    {
       res.status(400)
    }
})

module.exports = router