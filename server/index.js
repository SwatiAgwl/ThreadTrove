const express= require('express');
const app= express();

const userRoutes= require('./routes/user');
const profileRoutes= require('./routes/profile');
const paymentRoutes= require('./routes/payment');
const productRoutes= require('./routes/product');
const contactRoutes= require('./routes/contact');

const dotenv= require('dotenv');
dotenv.config();
const cookieParser= require('cookie-parser');
const database= require('./config/database');
const {cloudinaryConnect}= require('./config/cloudinary')

const cors= require('cors');
const fileUpload= require('express-fileupload');
const port= process.env.port || 4000;

// db connect
database.dbConnect();
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:  ['https://kala-mandir.vercel.app', 'http://localhost:3000'],
    credentials: true,
}))
app.use(fileUpload({  
    useTempFiles : true,
    tempFileDir : '/tmp'
}));
// cloudinary connection
cloudinaryConnect();

// routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/contact", contactRoutes);

// default route
app.get("/", (req,res)=>{
    return res.json({
        success: true,
        message: "your server is up and running..."
    })
})

// activate server
app.listen(port, ()=>{
    console.log(`App is running at port ${port}`)
})