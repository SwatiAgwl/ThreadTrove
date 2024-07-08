const Razorypay= require('razorpay');

exports.instance= new Razorypay({
    key_id: process.env.razorpay_id,
    key_secret : process.env.razorpay_secret,
});