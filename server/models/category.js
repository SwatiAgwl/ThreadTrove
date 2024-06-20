const mongoose= require('mongoose');

const categorySchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }], 
})

module.exports= mongoose.model("Category", categorySchema);