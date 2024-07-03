//
const express= require('express');
const router= express.Router();

// method , route , handler
const {updateProfile,deleteAccount,getAllOrders,getAllUserDetails}= require('../controllers/profile');
const {auth}= require('../middlewares/auth');

router.post('/updateProfile', auth,updateProfile);
router.delete('/deleteAccount',auth, deleteAccount);
router.get('/getAllOrders',auth, getAllOrders); // isCustomer
router.get('/getAllUserDetails',auth, getAllUserDetails);

module.exports= router;