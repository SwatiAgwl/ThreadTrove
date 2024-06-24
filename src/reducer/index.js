
import authReducer from "../slices/authSlice";
import bagReducer from "../slices/bagSlice";
import wishlistReducer from "../slices/wishlistSlice";
import userReducer from "../slices/userSlice";
import productReducer from '../slices/productSlice'
import orderReducer from '../slices/orderSlice'
import { combineReducers } from "@reduxjs/toolkit";


const rootReducer= combineReducers({
    auth: authReducer,
    bag: bagReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    product: productReducer,
    order: orderReducer,
})

export default rootReducer