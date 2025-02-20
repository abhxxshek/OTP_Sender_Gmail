const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const otpModel=require('../models/otpData');

//otp generation
function otpGeneration(){
    let otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}

//nodemailer setup
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.email,
        pass:process.env.pass,
    }
});

//send otp to user
router.post('/send-otp',async(req,res)=>{
    const {email}=req.body;
    const otp=otpGeneration();
    const data=new otpModel({email,otp});
    await data.save();
    const mailOptions = {
        from: 'ambient963@gmail.com',
        to: email,
        subject: 'Your OTP',
        text: `Your OTP is ${otp}.OTP is valid for only 5 minutes`
        };

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                return res.status(400).send({message:"Failed to send the OTP"});
            }
            res.status(200).send({message:"OTP sent successfully"});
        });
});

//to verify otp
router.post('/verify-otp',async(req,res)=>{
    try{
        const {email,otp}=req.body;
        const data=await otpModel.findOne({email});
        if (!data) {
            return res.status(400).send({ message: "No OTP found for this email. Please request a new OTP." });
        }
        console.log(data)
        if(data.otp==otp){
            await otpModel.deleteOne({email:data.email});
            return res.status(200).send({ message: "OTP verified successfully" });
        }else{
            res.status(400).send({message:"Invalid OTP"});
        }
    }catch(error){
        console.error("Error in OTP verification:", error);
        res.status(500).send({ message: "Server error. Please try again." });
    }
   
});

module.exports=router;