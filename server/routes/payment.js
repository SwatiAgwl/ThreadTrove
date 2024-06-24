const express= require('express')
const router= express.Router();

const {auth, isCustomer}= require("../middlewares/auth")
const {capturePayment, verifySignature, sendPaymentSuccessEmail}= require("../controllers/payments")

router.post("/capturePayment",auth,isCustomer, capturePayment);
router.post("/verifySignature",auth,isCustomer, verifySignature);
router.post("/sendPaymentSuccessEmail",auth,isCustomer, sendPaymentSuccessEmail);

module.exports= router;