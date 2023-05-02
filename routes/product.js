const router = require('express').Router();
const Product = require('../models/Product')


// Adding products to Home page



router.post("/AddingProducts",async (req, res) => 
{

   const productData = new Product(
    {
       title: req.body.title,
       desc: req.body.desc,
       img: req.body.img,
       categories: req.body.categories,
       size: req.body.size,
       color: req.body.color,
       price: req.body.price
    }
    )

    try
    {
        const dataSaved = await productData.save();
        res.status(200).json(dataSaved)
    }
    catch(err)
    {
        console.log(err)
        res.status(401).json(err);
    }
}
)

router.get("/getData", async (req, res) => 
{
    
    const fetchdata = Product.find((err, docs)=> 
    {
         if(!err)
         {
            res.set({
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            res.status(200).json(docs)
         }
         else
         {
            res.status(401).json(err)
         }

    });
    
    // try
    // {
    //      res.status(200).json(fetchdata);
    // }
    // catch(err)
    // {
    //     res.status(401).json(err);
    // }
})

module.exports = router 