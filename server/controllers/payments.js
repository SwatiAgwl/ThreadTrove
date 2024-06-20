const Product= require('../models/product');
const User= require('../models/user');
const {instance}= require('../config/razorpay')
const mailSender= require('../utils/mailSender');


// // capture payment
// exports.capturePayment= async(req,res)=>{
//     // fetch userId and prodId
//     const {prodId}= req.body; // mere case mei i can have multile products while payment to prodId thodi nikalege
//     const userId= req.user.id;
//     // validate- product
//     if(!prodId){
//         return res.json({
//             success: false,
//             message: "Please provide a valid product"

//         })
//     }
//     let product;
//     try{
//         product= await Product.findById(prodId);
//         if( !product){
//             return res.json({
//                 success: false,
//                 message: "Couldn't find product details"
//             })
//         }
//     }
//     catch(err){
//         return res.json({
//             success: false,
//             message: err.message,
//         })
//     }
//     // create order
//     const amount= product.price;
//     const currency= "INR";

//     const options= {
//         amount: amount*100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes: {
//             product_id: prodId,
//             userId,
//         }
//     }

//     try{
//         const paymentResponse= await instance.orders.create(options);
//         console.log("payment response(order creation) ", paymentResponse);
//         // ret res
//         return res.status(200).json({
//             success: true,
//             product_name: product.name,
//             order_id: paymentResponse.id,
//             message: "order created succ, payment is initiated"
//         }

//         )
//     }
//     catch(err){
//         return res.json({
//             success: false,
//             message: "error occured while creating order"
//         })
//     }
// }

// 6
// // verify signature of razorpay and server
// exports.verifySignature= async(req,res)=>{
//     const webhookSecret= "12345678";

//     const signature= req.headers["x-razorpay-signature"];

//     const shasum= crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest= shasum.digest("hex");

//     if( signature=== digest){
//         console.log("Payment is authorized");

//         const {prodId, userId}= req.body.payload.payment.entity.notes;

//         try{

//             // find the user and add this order in their orders
//             // orders array hona chahiye user mei so that ek nya order push kr ske


//             // mail send krdo confirmation ka that order ho gya
//             const userDetails= await User.findById(userId);
//             const emailResponse= await mailSender(
//                 userDetails.email,
//                 "Your products are ordered successfully..",
//                 "Congratulations! from KalaMandir",
//             )
//             console.log(emailResponse);
//             return res.status(200).json({
//                 success: true,
//                 message: "Signature verified and products ordered"
//             })
//         }
//         catch(err){
//             console.log("error", err);
//             return res.json({
//                 success: false,
//                 message: "error occured after authz payment while adding order in user or sending order confirm mail"

//             })
//         }
//     }
//     else{
//         return res.status(400).json({
//             success: false,
//             message: "invalid request,  payment secrets didn't match"
//         })
//     }
// }



// 2nd

// // capture payment
// exports.capturePayment = async (req, res) => {
//     // fetch productIds and userId
//     const { productIds } = req.body;
//     const userId = req.user.id;

//     // validate - productIds
//     if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
//         return res.json({
//             success: false,
//             message: "Please provide valid product IDs"
//         });
//     }

//     let products;
//     try {
//         products = await Product.find({ _id: { $in: productIds } });
//         if (products.length !== productIds.length) {
//             return res.json({
//                 success: false,
//                 message: "Couldn't find all product details"
//             });
//         }
//     } catch (err) {
//         return res.json({
//             success: false,
//             message: err.message,
//         });
//     }

//     // calculate total amount
//     const amount = products.reduce((total, product) => total + product.price, 0);
//     const currency = "INR";

//     // create order options
//     const options = {
//         amount: amount * 100,  // Amount in paise
//         currency,
//         receipt: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
//         notes: {
//             product_ids: productIds.join(','),
//             user_id: userId,
//         }
//     };

//     try {
//         const paymentResponse = await instance.orders.create(options);
//         console.log("payment response(order creation) ", paymentResponse);

//         // return response
//         return res.status(200).json({
//             success: true,
//             product_names: products.map(product => product.name),
//             order_id: paymentResponse.id,
//             message: "Order created successfully, payment is initiated"
//         });
//     } catch (err) {
//         return res.json({
//             success: false,
//             message: "Error occurred while creating order"
//         });
//     }
// }



// // verify signature of razorpay and server
// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678";
//     const signature = req.headers["x-razorpay-signature"];
//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature === digest) {
//         console.log("Payment is authorized");

//         const { product_ids, user_id } = req.body.payload.payment.entity.notes;

//         try {
//             // find the user and add this order in their orders
//             const userDetails = await User.findById(user_id);
//             if (!userDetails) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "User not found"
//                 });
//             }

//             // You might want to add order details to the user's orders array here
//              userDetails.orders.push({ order_id: paymentResponse.id, products: product_ids });

//             // Save updated user details (if modifying the user document)
//             await userDetails.save();

//             // send order confirmation mail
//             const emailResponse = await mailSender(
//                 userDetails.email,
//                 "Your products are ordered successfully",
//                 "Congratulations! from KalaMandir"
//             );

//             console.log(emailResponse);
//             return res.status(200).json({
//                 success: true,
//                 message: "Signature verified and products ordered"
//             });
//         } catch (err) {
//             console.log("error", err);
//             return res.json({
//                 success: false,
//                 message: "Error occurred after authorizing payment while adding order to user or sending order confirmation mail"
//             });
//         }
//     } else {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid request, payment secrets didn't match"
//         });
//     }
// }






// 3rd

exports.capturePayment = async (req, res) => {
    const { productIds, quantities } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        return res.json({
            success: false,
            message: "Please provide valid product IDs"
        });
    }

    let products;
    try {
        products = await Product.find({ _id: { $in: productIds } });
        if (products.length !== productIds.length) {
            return res.json({
                success: false,
                message: "Couldn't find all product details"
            });
        }
    } catch (err) {
        return res.json({
            success: false,
            message: err.message,
        });
    }

    let totalPrice = 0;
    const orderItems = [];

    try {
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const quantity = quantities[i] || 1; // Default quantity is 1 if not provided
            const orderItem = new OrderItem({
                order: null, // This will be set after creating the order
                product: product._id,
                quantity,
                price: product.price,
            });
            await orderItem.save();
            orderItems.push(orderItem);
            totalPrice += product.price * quantity;
        }

        const newOrder = new Order({
            user: userId,
            totalPrice,
            status: 'Pending',
            items: orderItems.map(item => item._id),
        });
        await newOrder.save();

        // Update order items to reference the created order
        for (let orderItem of orderItems) {
            orderItem.order = newOrder._id;
            await orderItem.save();
        }

        // Create payment options
        const options = {
            amount: totalPrice * 100,  // Amount in paise
            currency: "INR",
            receipt: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
            notes: {
                order_id: newOrder._id.toString(),
                user_id: userId,
            }
        };

        const paymentResponse = await instance.orders.create(options);
        console.log("payment response(order creation) ", paymentResponse);

        // Find the user and update their orders array
        const userDetails = await User.findById(userId);
        userDetails.orders.push(newOrder._id);
        await userDetails.save();

        // Send confirmation email
        const emailResponse = await mailSender(
            userDetails.email,
            "Your products are ordered successfully..",
            "Congratulations! from KalaMandir"
        );
        console.log(emailResponse);

        // Return response
        return res.status(200).json({
            success: true,
            product_names: products.map(product => product.name),
            order_id: paymentResponse.id,
            message: "Order created successfully, payment is initiated"
        });
    } catch (err) {
        return res.json({
            success: false,
            message: "Error occurred while creating order"
        });
    }
}
