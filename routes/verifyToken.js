const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next)=> 
{
      
      const  authHeader = req.headers.token;
      
    if(authHeader)
    {  
          const token = authHeader.split(" ")[1];
          jwt.verify(token, process.env.JWT_key, (err, userdata) => 
          {
            console.log(userdata)
              if(err){
                res.status(403).json("Token is not valid")
              }
               req.user = userdata;
               next();
          })
    }
    else 
    {
        res.status(401).json("You are not a authorised Logger..")
    }

    
}


const verifyTokenAndAuthorised = (req, res, next) => 
{
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin)
        {
            next();
        }
        else
        {
            res.status(403).json("You are not allowed")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorised}
