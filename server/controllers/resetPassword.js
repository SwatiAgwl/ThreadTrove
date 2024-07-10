const User= require('../models/user');
const mailSender= require('../utils/mailSender');
const bcrypt= require('bcrypt')
require('dotenv').config();

// reset pwd token
exports.resetPasswordToken= async(req,res)=>{
    try{
        // fetch data 
        const {email}= req.body;
        // validate mail
        const user= await User.findOne({email});
        if( !user){
            return res.json({
                success: false,
                message: "your mail is not registered with us."
            })
        }
        //generate token
        const token= crypto.randomUUID();
        // update user by adding token and expiration time
        const updatedDetails= await User.findOneAndUpdate(
            {email: email},
            {
                token: token,
                resetPasswordExpires: Date.now() + 5*60*1000,
            },
            {
                new: true,
            }
        )
        // create url
        const frontendUrl = process.env.FRONTEND_URL;
        const url = `${frontendUrl}/update-password/${token}`;
        
        //send mail
        await mailSender(email, `Password Reset Link: ${url}`, "Password Reset Link")
        // ret res
        return res.json({
            success: true,
            message: "Mail sent successfully, pl check your mail and change pwd"
        })
    }
    catch(err){
        return res.json({
            success: false,
            message: "error in sending reset pwd link on email"
        })
    }
}

// reset pwd
exports.resetPassword= async(req,res)=>{
    try{
        // fetch new pwd, confirm pwd
        const {password, confirmPassword, token}= req.body; // frontend token ko url mei se req body mei daal rha hai
        // validate pwd
        if( password !== confirmPassword){
            return res.json({
                success: false,
                message: "Passwords don't match"
            })
        }
        // get userdetails from db using token
        const userDetails= await User.findOne({token: token});
        // if no entry- invalid token
        if( ! userDetails){
            return res.json({
                success: false,
                message: "Invalid token"
            })
        }
        // token time check
        if( Date.now() > userDetails.resetPasswordExpires){
            return res.json({
                success: false,
                message: "Token is expired, please regenerate "
            })
        }
        // hash pwd
        const hashedPwd= await bcrypt.hash(password,10);
        // update in db
        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPwd},
            {new: true},
        )
        // send res
        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        })
    }
    catch(err){
        return res.json({
            success: false,
            message: "error occured while resetting pwd"
        })
    }
}