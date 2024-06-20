const express= require('express');
const router= express.Router();

// method , route , handler
const {signup,login,sendOtp,changePassword}= require('../controllers/auth');
const {resetPassword,resetPasswordToken}= require('../controllers/resetPassword');
const { sign } = require('crypto');


// authn
router.post('/login',login );
router.post('/signup',signup );
router.post('/sendOtp',sendOtp);
// reset
router.post('/resetPasswordToken', resetPasswordToken);
router.post('/resetPassword', resetPassword);

module.exports= router;