 const { verifyToken, verifyTokenAndAuthorised } = require('./verifyToken');

const router = require('express').Router();

router.put("/:id",verifyTokenAndAuthorised, async (req, res)=>
{
   
    

     console.log(req.body)
    try
    {
        const updateUser = await User.findByIdAndUpdate(
           req.params.id,
            {
                $set: req.body.username,
            },
            {new : true}
        ,

        function (err, docs)
       {
         if(err)
         {
            res.status(401).json(err)
         }
         else
         {
            res.status(200).json(docs)
         }
       })
    }
    catch(err)
    {
        res.status(500).json(err)
    }


})


module.exports = router