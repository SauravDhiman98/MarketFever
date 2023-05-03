const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const verifyGeneratedToken = require('../routes/verifyUser');

//Register

router.post("/register", async (req, res) => {
  try 
  {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString('hex')
    const newUser =  new User({
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      salt: salt
    });
    const data = {
      username: req.body.username,
      email: req.body.email
      }
    const token = jwt.sign(data, process.env.JWT_Auth_Key, {expiresIn: '3000s'})
    const savedData = await newUser.save();
    savedData.password = null;
    savedData.salt = null;
    const userData = {
      userInfo: savedData,
      token: token
    }
    res.status(201).json(userData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const findUser = await User.findOne({
      username: req.body.username,
    });
    if (findUser != null) {
      const generatehash = crypto.pbkdf2Sync(req.body.password, findUser.salt, 1000, 64, `sha512`).toString('hex')
      if (generatehash != findUser.password) {
        res.status(401).json("Wrong Password");
      } else {
        const data = {
          username: findUser.username,
          email: findUser.email
          }
        const token = jwt.sign(data, process.env.JWT_Auth_Key, {expiresIn: '3000s'})
        findUser.password = null;
        findUser.salt = null;
        const userData = {
          userInfo: findUser,
          token: token
        }
       // console.log(userData)
        res.status(200).json(userData);
      }
    } else {
      res.status(401).json("Wrong username");
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// To check whether user exist or not

router.post("/isuserexist/:id", async (req, res) => {
  try {
    const isUserExist = await User.findOne({ username: req.params.id});

    if (isUserExist != null) {
      res.status(200).json(true);
    } else {
      res.status(201).json(false);
    }
  } catch (err) {
    console.log(err);
  }
  // if(isUserExist != null)
  // {
  //   res.status(200).json(isUserExist)
  // }
  // else
  // {
  //   res.status(401).json("User already exists pls change the user")
  // }
});


router.get('/getcartitems/:id', async (req, res) => {
  try{
   const userId = req.params.id;
   const findUserById = await User.findById({_id: userId})
   res.status(200).json(findUserById.product)
  }
  catch(err){
    console.log(err)
    res.status(401).json(err)
  }
})


router.get('/verifytoken', async (req, res) => {
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
    console.log(err)
      res.status(400).send(err)
  }
})

module.exports = router;
