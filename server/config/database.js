const mongoose= require('mongoose');
require('dotenv').config();

exports.dbConnect= ()=>{
     mongoose.connect(process.env.mongodb_url
    //,{
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // }
)
    .then(()=> console.log( "db connection established succ"))
    .catch((err)=>{
        console.log( "err while connecting with db");
        console.error(err);
        process.exit(1);
    })
}