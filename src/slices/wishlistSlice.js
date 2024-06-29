import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState= {
    totItems: localStorage.getItem('totItems') ? JSON.parse(localStorage.getItem('totItems')) : 0,
    wishlistItems: localStorage.getItem('wishlistItems') ? JSON.parse( localStorage.getItem('wishlistItems')) : [],

}
const wishlistSlice= createSlice({
    name: "wishlist",
    initialState: initialState,
    reducers: {
        // add ke lie puri product details honi chahiye , remove to only id ke through bhi ho skta
        // add to cart
        addToWishlist(state,action){
            const product= action.payload;
            const index= state.wishlistItems.findIndex( (p)=> p._id === product._id);

            if( index >=0){
                toast.error( "Item already present in wishlist");
                return;
            }

            state.wishlistItems.push(product);
            state.totItems++;
            
            // update in local storage
            localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
            localStorage.setItem("totItems", JSON.stringify(state.totItems));

            toast.success("Item added to wishlist")
        },
        // remove from cart

        removeFromWishlist (state,action){
            const productId= action.payload;
            const index= state.wishlistItems.findIndex((p)=> p._id === productId);

            if( index >=0){
                state.totItems--;
                state.wishlistItems.splice(index,1);
                
                // update local storag
                localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
                localStorage.setItem("totItems", JSON.stringify(state.totItems));

                //toast.error("Item removed from wishlist")
            }

        }
        // reset cart
    }
})

export const {addToWishlist,removeFromWishlist}= wishlistSlice.actions;
export default wishlistSlice.reducer;
