const mongoose=require('mongoose');
const otpSchema=mongoose.Schema({
    email:String,
    otp:String,
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 300 //OTP expires in 5 minutes (300 seconds)
      }
});
const otpData=mongoose.model('otp',otpSchema);
module.exports=otpData;