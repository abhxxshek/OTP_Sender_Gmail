const express=require('express');
const app=new express();
require('dotenv').config();
const morgan=require('morgan')
app.use(morgan('dev'));
const cors=require('cors');
app.use(cors());

require('./db/connection');

const otpRoutes=require('./routes/otpRoutes');
app.use('/otp',otpRoutes)

app.listen(process.env.PORT,(req,res)=>{
    console.log(`server is running on port ${process.env.PORT}`);
})
