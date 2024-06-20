const Razorypay= require('razorpay');

exports.instance= new Razorypay({
    key_id: process.env.razorypay_id,
    key_secret : process.env.razorpay_secret,
});