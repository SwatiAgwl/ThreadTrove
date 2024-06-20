const mongoose= require('mongoose');

const profileSchema= new mongoose.Schema({
    gender: {
        type: String,
    },
    dob: {
        type: Date,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
   
})

module.exports= mongoose.model("Profile", profileSchema);