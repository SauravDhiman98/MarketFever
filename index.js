const express = require('express')
const mongoose = require('mongoose')
const app = express();
const UserRouter = require('./routes/users')
const Auth  =  require('./routes/auth')
const Product = require('./routes/product')
const dotenv  = require('dotenv')
const Address = require("./routes/adress")
const Cors = require('cors');
const data = require('./routes/cart')
const bodyParser = require('body-parser')
const Payment = require('./routes/paymentRouter/payment')

dotenv.config()



mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("connection is successfull with dB"))
.catch(err => console.log(err))

app.use(Cors({
  origin:"*",
  credentials: true,
  optionSuccessStatus:200
}))

// app.use(bod
  app.use(express.json())


app.use("/api/",Product,data, Auth, Address, Payment);

if(process.env.NODE_ENV == 'production'){
  app.use(express.static("Client/build"))
  const path = require("path")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Client','build','index.html'))
  })
}

app.listen(process.env.PORT || 5000, () => 
{
  console.log('Backend Server is running');
})