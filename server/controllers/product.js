const Category= require('../models/category');
const Product= require('../models/product');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// create Product
exports.createProduct= async(req,res)=>{
    try{
        // fetch data
        const {name,description, price, tag,category}= req.body;
        console.log("before fetching thumbnail");
        // thumbnail
        const thumbnail= req.files.thumbnailImg;
        console.log("prod fields",name,description,price,tag,category,thumbnail);
        // validate
        if( !name || !description || !price || !tag || !category || !thumbnail){
            return res.json({
                success: false,
                message: "All fields are required",
            })
        } 
        // validate category
        const categDetails= await Category.findById({_id:category});
        if( !categDetails){
            return res.json({
                success: false,
                message: "Category not found",
            })
        }
        // upload thumbnail to cloudinary
        const thumbnailImage= await uploadImageToCloudinary(thumbnail, process.env.folder_name);
        console.log(thumbnailImage.secure_url);
        console.log('uploaded to cloudin succ')
        // create entry in db
        const newProduct= await Product.create({
            name,
            description,
            price,
            // stock,
            tag,
            category,
            thumbnail: thumbnailImage.secure_url,
        })
        console.log('updation in prod succ')
        // update category schema to add this new product
        await Category.findByIdAndUpdate(
            {_id: category},
            {
                $push: {
                    products: newProduct._id,
                }
            },
            {new: true,}
        )
        console.log('updation in categ succ')

        // ret res
        return res.status(200).json({
            success: true,
            message: "Product created successfully",
        })
    }
    catch(err){
        return res.json({
            success: false,
            message: "Error occured while creating a new product"
        })
    }
}

// get all Products
exports.getAllProducts= async(req,res)=>{
    try{
        const allProducts= await Product.find({});
        return res.status(200).json({
            success:true,
            message: "Displaying all products",
            allProducts,
        })
    }
    catch(err){
        return res.json({
            success:false,
            message: "Error in showing all products"
        })
    }
}


// get product details
exports.getProductDetails= async(req,res)=>{
    try{
        // get product id
        const {prodId}= req.body;
        // find prod details
        const prodDetails= await Product.findById({_id:prodId})
                            .populate("category").exec();
        // validation
        if (!prodDetails){
            return res.status(400).json({
                success: false,
                message: `Couldn't find product with ${prodId} `,
            })
        }
        // ret res
        return res.status(200).json({
            success: true,
            message: "Product details fetched succ",
            data: prodDetails,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `error occured while fetching product details, ${err.message}`,
        })
    }
}
