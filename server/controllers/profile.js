const User= require('../models/user');
const Profile= require('../models/profile');
const Order= require('../models/order')


// update profile
exports.updateProfile= async(req, res)=>{
    try{
        // fetch data
        const {gender,dob="",city,state,country}= req.body;
        if( !gender || !city || !state || !country){
            return res.json({
                success: false,
                message: 'all fields are required',
            })
        }
        // get user id
        const userId= req.user.id;
        
        const userDetails= await User.findById(userId);
        // if( !userDetails){
        //     return res.json({
        //         success: false,
        //         message: "user not found",
        //     })
        //} no need

        // get profile id
        const profileId= userDetails.additionalDetails;
        await Profile.findByIdAndUpdate(
            {_id: profileId},
            {
                gender: gender,
                dob: dob,
                city,
                state,
                country,
            },
            {new: true},

        )
        // ret res
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        })

    }
    catch(err){
        return res.json({
            success: false,
            message: "profile couldn't be updated",
        })
    }
}



// delete account - schedule deleting and read chron job
exports.deleteAccount= async(req,res)=>{
    try{
        // get id
        const id= req.user.id;
        // validate id exists
        const user= await User.findById(id);
        if( !user){
            return res.status(404).json({
                success: false,
                message: "user not found",
            })
        }
        // delete profile
        const profId= user.additionalDetails;
        console.log('profId', profId);
        await Profile.findByIdAndDelete(profId);
        // delete user
        await User.findByIdAndDelete(id);
        // ret res
        return res.status(200).json({
            success: true,
            message: "account deleted successfully",
        })

    }
    catch(err){
        return res.json({
            success: false,
            message: "account couldn't be deleted,please try again",
        })
    }
}

// get details of a user
exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id
        const userDetails = await User.findById(id)
                            .populate("additionalDetails")
                            .populate("wishlist")
                            .populate("cart")
                            .populate("orders")
                            .exec()
        console.log(userDetails)
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        })
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Couldn't fetch entire details of user",
        })
    }
  }
// get all orders of a user
exports.getAllOrders= async(req,res)=>{
    try{
        // fetch data
        const user_id= req.user.id;
        
        let userDetails= await User.findOne({_id:user_id})
                         .populate({
                            path: "orders",
                            populate: {
                                path: "items",
                                populate: {
                                    path: "product"
                                }
                            }
                         }).exec();
            
        if( !userDetails){
            return res.json({
                success: false,
                message: `Couldn't find user with id: ${user_id}`
                
            })
        }        
        if( userDetails?.orders.length ===0){
            return res.json({
                success: true,
                message: "You haven't ordered anything yet",
                data: null
              
            })
            //return res.json(null);
        }            
        //const allOrders= await Order.find({});
        return res.status(200).json({
            success: true,
            message: "Displaying all order items",
            data: userDetails?.orders,
        })
    }
    catch(err){
        return res.json({
            success: false,
            message: "Error while fetching all orders list"
        })
    }
}

// admin dashboard