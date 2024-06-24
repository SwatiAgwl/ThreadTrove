const Product= require('../models/product');
const User= require('../models/user');
const {instance}= require('../config/razorpay')
const mailSender= require('../utils/mailSender');
const crypto= require('crypto');
const OrderItem= require('../models/orderItem')
const Order= require('../models/order')

/* steps:   create order (razorpay ka checkout page),
            send payment received mail, 
            verify signature then 
            add the product in user orders and 
            send product ordered mail
 */
exports.capturePayment= async(req,res)=>{
    const{ prod_ids}= req.body;
    const user_id = req.user.id;

    if( prod_ids.length === 0){
        return res.json({
            success: false,
            message: "Please provide atleast one product id"
        })
    }

    let total_amount= 0;
    for(const prodId of prod_ids){
        let product;
        try{
          //console.log("product id is and type is", prodId, typeof(prodId));
          console.log(prodId);
            product = await Product.findById(prodId);
            if( !product){
                return res.json({
                    success: false,
                    message: `Couldn't find the product with id : ${prodId}`
                })
            }
            total_amount+= product.price;
        }
        catch(err){
            return res.json({
                success: false,
                message: err.message,
                data: "error in find product api"
            })
        }
    }


    const options = {
        amount: total_amount * 100, // converting rupee to paisa , amt in smallest currency unit
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
      }
    
    try {
        // Initiate the payment using Razorpay
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)
        res.json({
          success: true,
          data: paymentResponse,
        })
      } catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ success: false, message: "Could not initiate order." })
    } 

}


// verify payment
exports.verifySignature = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const prod_ids = req.body?.prod_ids
  
    const user_id = req.user.id
    console.log(razorpay_order_id)
    console.log(razorpay_payment_id)
    console.log(razorpay_signature)
    console.log( prod_ids)
    console.log( user_id)
  
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !prod_ids ||
      !user_id
    ) {
      return res.status(200).json({ success: false, message: "Payment Failed" })
    }
  
    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac("sha256", process.env.razorpay_secret)
        .update(body.toString())
        .digest("hex")

    if (expectedSignature === razorpay_signature) {
        await addOrder(prod_ids,user_id,res);
        return res.status(200).json({ success: true, message: "Payment Verified" })
    }

    return res.status(200).json({ success: false, message: "Payment Failed" })
}


// update in db 
// const addOrder= async(prod_ids,user_id,res)=>{
//     // user ke orders mei ye products bhi add krdo
//     for(const prodId of prod_ids){
//         try{
//             const user= await User.findByIdAndUpdate(
//                 {_id: user_id},
//                 // {
//                 // $push: {
//                 //     orders: prodId,
//                 // }
//                 // },
//                 //{ new: true}
//             )

//             const product= await Product.findById(prodId);
//             // Send an email notification to the user
//             const emailResponse = await mailSender(
//                 user.email,
//                 `Thank You for shopping with us!
//                  Best wishes
//                  Kala Mandir Silk Centre`,
//                 `Successfully ordered ${product.name}`,
                
//             )

//             console.log("Email sent successfully: ", emailResponse.response)
//         }
//         catch(err){
//             console.log(err)
//             return res.json(
//                 { success: false, error: err.message })
//         }
//     }
// }


const addOrder = async (prod_ids, user_id, res) => {
  try {
      const user = await User.findById(user_id);
      if (!user) {
          return res.json({ success: false, error: "User not found" });
      }

      let totalPrice=0;
      const orderItems = [];

      for (const prodId of prod_ids) {
        const product = await Product.findById(prodId);
        if (!product) {
            return res.json({ success: false, error: `Product not found: ${prodId}` });
        }

        totalPrice += product.price;
        const orderItem = new OrderItem({
              product: prodId,
        });

          await orderItem.save();
          orderItems.push(orderItem._id);
      }

      const newOrder = new Order({
          user: user._id,
          totalPrice,
          status: 'confirmed', // or any other status you need
          items: orderItems,
      });

      await newOrder.save();

      user.orders.push(newOrder._id);
      await user.save();

      // Optionally, send an email notification to the user
      const emailResponse = await mailSender(
          user.email,
          `Thank You for shopping with us!
           Best wishes
           Kala Mandir Silk Centre`,
          `Successfully ordered items worth ${totalPrice}`,
      );

      console.log("Email sent successfully: ", emailResponse.response);

  } catch (err) {
      console.log(err);
      return res.json({ success: false, error: err.message });
  }
}


// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const user = await User.findById(userId)
  
      await mailSender(
        user.email,
        ` ${user.name},
          amount / 100,
          orderId,
          paymentId
        `,
        `Payment Received`,
      )
    } 
    catch (error) {
      console.log("error in sending payment succ mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }

// // capture payment
// exports.capturePayment= async(req,res)=>{
//     // fetch userId and prodId
//     const {prodId}= req.body; // i can have multile products while payment, to prodId thodi nikalege
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

// exports.capturePayment = async (req, res) => {
//     const { productIds } = req.body;
//     const userId = req.user.id;

//     // Validate input
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

//     let totalPrice = 0;
//     const orderItems = [];

//     try {
//         for (let i = 0; i < products.length; i++) {
//             const product = products[i];
          
//             const orderItem = new OrderItem({
//                 order: null, // This will be set after creating the order
//                 product: product._id,
//                 price: product.price,
//             });
//             await orderItem.save();
//             orderItems.push(orderItem);
//             totalPrice += product.price ;
//         }

//         const newOrder = new Order({
//             user: userId,
//             totalPrice,
//             status: 'Pending',
//             items: orderItems.map(item => item._id),
//         });
//         await newOrder.save();

//         // Update order items to reference the created order
//         for (let orderItem of orderItems) {
//             orderItem.order = newOrder._id;
//             await orderItem.save();
//         }

//         // Create payment options
//         const options = {
//             amount: totalPrice * 100,  // Amount in paise
//             currency: "INR",
//             receipt: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
//             notes: {
//                 order_id: newOrder._id.toString(),
//                 user_id: userId,
//             }
//         };

//         const paymentResponse = await instance.orders.create(options);
//         console.log("payment response(order creation) ", paymentResponse);

//         // Find the user and update their orders array
//         const userDetails = await User.findById(userId);
//         userDetails.orders.push(newOrder._id);
//         await userDetails.save();

//         // Send confirmation email
//         const emailResponse = await mailSender(
//             userDetails.email,
//             "Your products are ordered successfully..",
//             "Congratulations! from KalaMandir"
//         );
//         console.log(emailResponse);

//         // Return response
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
