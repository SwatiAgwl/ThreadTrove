const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
    },
    wishlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist",
        
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart", 

    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
       
    }],
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    }
})

module.exports= mongoose.model("User", userSchema);