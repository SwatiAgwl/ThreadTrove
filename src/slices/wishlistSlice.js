import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    totItems: localStorage.getItem('totItems') ? JSON.parse(localStorage.getItem('totItems')) : 0
}
const wishlistSlice= createSlice({
    name: "wishlist",
    initialState: initialState,
    reducers: {
        setTotItems(state,value){
            state.totItems= value.payload;
        }
        // add to cart
        // remove from cart
        // reset cart
    }
})

export const {setTotItems}= wishlistSlice.actions;
export default wishlistSlice.reducer;
