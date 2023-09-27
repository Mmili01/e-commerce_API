require('dotenv').config()
require('express-async-errors')

// express
const express = require("express");
const app = express();

// the rest of the package 
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

//database
const connectDB = require('./db/connect')

//routers
 const authRouter = require('./routes/authRoute')
 const userRouter = require('./routes/userRoute')
 const productRouter= require('./routes/productRoute')
 const reviewRouter = require('./routes/reviewRoute')

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./public'))
app.use(fileUpload())


//routes
app.get ('/',(req,res)=>{
    res.send('ecommerce API')
})

app.use( '/api/v1/authRouter',  authRouter)

app.use( '/api/v1/users',  userRouter)

app.use('/api/v1/products', productRouter)

app.use('/api/v1/reviews', reviewRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONG0_URL)
    app.listen(port, () => {
      console.log(`app is listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
