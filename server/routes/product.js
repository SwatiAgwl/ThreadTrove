const express= require('express');
const router= express.Router();

// method , route , handler
const {createProduct,getAllProducts,getProductDetails}= require('../controllers/product');
const {createCategory,getAllCategories,categoryPage}= require('../controllers/category');
const {auth,isCustomer,Admin}= require('../middlewares/auth');

router.post('/createProduct', auth,Admin,createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getProductDetails', getProductDetails);

router.post('/createCategory', auth,Admin,createCategory);
router.get('/getAllCategories', getAllCategories);
router.post('/categoryPage', categoryPage);

module.exports= router;
