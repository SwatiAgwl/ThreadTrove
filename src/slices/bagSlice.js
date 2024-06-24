import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState= {
    totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0,
    bagItems: localStorage.getItem("bagItems")? JSON.parse(localStorage.getItem("bagItems")): [],
    bagTotal: localStorage.getItem("bagTotal")? JSON.parse( localStorage.getItem("bagTotal")): 0,
}
const bagSlice= createSlice({
    name: "bag",
    initialState: initialState, 
    reducers: {
        // setTotalItems(state,action){
        //     state.totalItems= action.payload;
        // },
        // add to bag
        addToBag (state,action){
            const product = action.payload;
            const index= state.bagItems.findIndex( (p)=> p._id === product._id);
            console.log(index);
            
            if( index >= 0){
                //product already in bag
                toast.error( "Item already in bag");
                return;
            }

            state.bagItems.push(product);
            state.totalItems++;
            state.bagTotal+= product.price;
            // Update to localstorage
            localStorage.setItem("bagItems", JSON.stringify(state.bagItems))
            localStorage.setItem("bagTotal", JSON.stringify(state.bagTotal))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            // show toast
            toast.success("Item added to bag")
        },


        // remove from bag
        removeFromBag (state,action){
            const productId= action.payload;
            console.log(productId);
            const index= state.bagItems.findIndex( (p)=> p._id === productId);
            console.log(index);

            if( index>=0){
                state.totalItems--;
                state.bagTotal-= state.bagItems[index].price;
                state.bagItems.splice(index,1);
                // Update to localstorage
                localStorage.setItem("bagItems", JSON.stringify(state.bagItems))
                localStorage.setItem("bagTotal", JSON.stringify(state.bagTotal))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                // show toast
                toast.success("Item removed from cart")
            }
        }
        // reset bag
    }
})

export const {addToBag,removeFromBag }= bagSlice.actions;
export default bagSlice.reducer;
