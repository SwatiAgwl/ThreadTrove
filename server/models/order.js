const mongoose= require('mongoose');

const orderSchema= new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        //required: true,
    },
    items: [ { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
    }],
   
})

module.exports= mongoose.model("Order", orderSchema);