const mongoose= require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otpCode: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60*1000,
    },
  
   
})

// pre middleware to verify otp
async function sendVerificationEmail(email,otp){
    console.log("email: ",email, "otp: ", otp);
    try{
        const mailResponse= await mailSender(email,`ThankYou for registering, your OTP is: ${otp} `, "Verification Email from KalaMandir");
        //console.log("Email sent successfully: ", mailResponse);
    }   
    catch(err){
        console.log("error while sending otp mail");
        console.log(err);
    }
}
otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otpCode);
    next();
})
module.exports= mongoose.model("OTP", otpSchema);