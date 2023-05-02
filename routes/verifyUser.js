const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generateToken = (req, res) => {
    try{
        const data = {
        username: req.body.username,
        email: req.body.email
        }

        const token = jwt.sign(data, process.env.JWT_Auth_Key, {expiresIn: '3600s'})

        res.status(200).json(token)
    }
    catch(err){
        res.status(401).json(err)
    }
}

const verifyGeneratedToken = (req, res) => {
    try{
        const tokenFromHeader = req.headers.token;
        console.log(tokenFromHeader)
        const isVerified = jwt.verify(tokenFromHeader, process.env.JWT_Auth_Key)
        if(isVerified){
            res.status(200).json({msg: "Verified"})
        }
    }
    catch(err)
    {
        res.status(400).send(err)
    }
}

module.exports = verifyGeneratedToken