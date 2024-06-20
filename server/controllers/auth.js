const User= require('../models/user')
const OTP= require('../models/otp');
const Profile = require('../models/profile');
const otpGenerator = require('otp-generator')
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
require('dotenv').config();



// send otp mail
exports.sendOtp = async(req,res)=>{
    try{
        // fetch data
        const {email}= req.body;
        // check if user already exists

        // generate otp
        const otp= otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets: false});
        console.log("otp generated: ", otp);
        // check uniqueness
        let result= await OTP.findOne({otp});
        while( result){
            otp= otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets: false});
            result= await OTP.findOne({otp});
        }
        // final otp 
        console.log("final unique otp", otp);
        // store in db
        const otpEntry= await OTP.create({
            email,
            otpCode: otp,
        })
        // return response
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        })
    }
    catch(err){
        console.log("error while sending otp verification mail");
        console.log(err);
    }
}

// signup
exports.signup= async(req,res)=>{
    try{
        // fetch data
        const {name,email,password,confirmPassword,phoneNum,otp,isAdmin}= req.body;
        // validate data
        if( !name || !email || !password || !confirmPassword || !phoneNum || !otp){
            return res.json({
                success: false,
                message: "All fields are required",
            })
        }

        const existingUser= await User.findOne({email});
        if( existingUser){
            return res.json({
                success: false,
                message: "Email already registered, try to log in"
            })
        }
        if( password !== confirmPassword){
            return res.json({
                success: false,
                message: "Password and Confirm Password don't match",
            })
        }

        
        // verify otp : find most recent otp stored for the user
        const recentOtpDetails= await OTP.find({email}).sort({createdAt: -1}).limit(1);
        const recentOtp= recentOtpDetails[0].otpCode;
        if( !recentOtp || !recentOtpDetails){
            return res.json({
                success: false,
                message: "no data found for any otp sent to this mail or otp has expired"
            })
        }
        console.log('recent otp', recentOtp);
        if( otp !== recentOtp){
            return res.json({
                success: false,
                message: "invalid otp"
            })
        }
        // hash pwd
        const hashedPwd= await bcrypt.hash(password, 10);
        // create db entry
        const profileDetails= await Profile.create({
            gender: null,
            dob:null,
            city: null,
            state: null,
            country:null,
        })
        const user= await User.create({
            name,
            email,
            password: hashedPwd, 
            phoneNum,
            isAdmin,
            additionalDetails: profileDetails._id,
    
        })
        
        // return res
        return res.status(200).json({
            success: true,
            message: "Account created successfully"
        })


    }
    catch(err){
        console.log("error while signing up, pls try again later")
        console.log(err);
    }
}


// login
exports.login= async(req,res)=>{
    try{
        // fetch data
        const {email , password}= req.body;
        // validate data- check user exists, pwd compare
        if( !email || !password){
            return res.json({
                success: false,
                message: "all fields are required",
            })
        }
        const user= await User.findOne({email});
        if( !user){
            return res.json({
                success: false,
                message: "Email not registered, Please first sign up",
            })
        }

        if( await bcrypt.compare( password,user.password)){
            const payload= { 
                email: user.email,
                id: user._id,
                isAdmin: user.isAdmin,

            }
            console.log("payload",payload);
             // generate jwt token
            const token= jwt.sign(payload,process.env.jwt_secret, {expiresIn: "1d",});
            user.token= token;
            user.password= undefined;
            // return cookie response
            const options= {
                expires: new Date( Date.now() + 1*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("token",token,options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged In successfully"
            })
        }

        else{
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            })
        }

       

        
    }
    catch(err){
        console.log("error while log in, pl try again..");
    }
}


// change password
exports.changePassword= async(req, res)=>{
    try{
        //fetch data
        // validate old pwd
        // new pwd, confirm pwd
        // update in db
        // send mail- pwd updated
        // return response
    }
    catch(err){
        console.log("error occured while changing password");
        console.log(err);
    }
}