const jwt= require('jsonwebtoken');
require('dotenv').config();
const User= require('../models/user')

// auth
exports.auth= async(req,res,next)=>{
    try{
        // extract token
        const token= req.cookies.token||
                     req.body.token ||
                     req.header("Authorization").replace("Bearer ", "");
        if( !token){
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            })
        }   
        // verify token
        try{
            const decode=  jwt.verify(token, process.env.jwt_secret);
            console.log(decode);
            req.user= decode; 
        }
        catch(err){
            return res.status(401).json({
                success: false,
                message:("token is invalid"),
            })
        }
        next();      
    }
    catch(err){
        console.log("error while authenticating user");
        console.log(err);
    }
}


// isCustomer
exports.isCustomer= async(req,res,next)=>{
    try{
        if( req.user.isAdmin !== false){
            return res.json({
                success: false,
                message: "this is a protected route for Customers only",
            })
        }
        next();
    }
    catch(err){
        return res.json({
            success: false,
            message: "User role can't be verified"
        })
    }
}
// isAdmin
exports.Admin= async(req,res,next)=>{
    console.log("is admin: ", req.user.isAdmin);
    // no need of using try-catch as synchronous call is there
    // try{
        if( !req.user.isAdmin){
            return res.json({
                success: false,
                message: "this is a protected route for admins only",
            })
        }
        next();
    // }
    // catch(err){
    //     return res.json({
    //         success: false,
    //         message: "User role can't be verified"
    //     })
    // }
}
