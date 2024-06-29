const mongoose= require('mongoose');

const productSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type:Number,
        //required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    tag: {
        type: [String],
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    }
    
})

module.exports= mongoose.model("Product", productSchema);