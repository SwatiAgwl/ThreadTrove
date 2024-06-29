const Category= require("../models/category");


// create categ
exports.createCategory= async(req,res)=>{
    try{
        // fetch data
        const {name}= req.body;
        // validate
        if( !name) {
            return res.json({
                success: false,
                message: "category name is required"
            })
        }
        // check if category already exists
        const result= await Category.findOne({name:name});
        if( result){
            return res.json({
                success: false,
                message: "Category already exists"
            })
        }
        // create entry in db
        const category= await Category.create({name: name});
        // ret res
        return res.status(200).json({
            success: true,
            message: "category created successfully"
        })
    }
    catch(err){
        return res.json({
            success:false,
            message: "error while creating category"
        })
    }
}

// get all categ
exports.getAllCategories= async(req,res)=>{
    try{
        const allCategories= await Category.find({}, {name: true});
        return res.status(200).json({
            success: true,
            message: "All categories returned successfully",
            data: allCategories,
        })
    }
    catch(err){
        return res.json({
            success:false,
            message: "error while listing all categories"
        })
    }
}

//categ page details- showing products of a category
exports.categoryPage= async(req, res)=>{
    try{
        //get categoryId
        const {categoryId}= req.body;
        // get products of that categ
        const selectedCategory= await Category.findById(categoryId)
                                .populate("products")
                                .exec();
         
        // validation
        if( !selectedCategory){
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }
        // ret res
        return res.status(200).json({
            success: true,
            data: { selectedCategory},
            message: "category products fetched successfully",
        })
    }
    catch(err){
        return res.json({
            success: false,
            message: "error while displaying category details"
        })
    }
}