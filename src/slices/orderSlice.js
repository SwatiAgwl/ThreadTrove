import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState= {
    orderItems:localStorage.getItem('orderItems') ? 
    JSON.parse(localStorage.getItem('orderItems')) : [],
}
console.log('Initial state from localStorage:', initialState);

const orderSlice= createSlice({
    name: "order",
    initialState: initialState,
    reducers:{
        setOrderItems (state,action){
            const items= action.payload;
            //state.orderItems.push(item);
            state.orderItems = [...items];
          
        localStorage.setItem("orderItems", JSON.stringify(state.orderItems))
        //toast.success("Items added to orders");
        }
    }
})

export const {setOrderItems }= orderSlice.actions;
export default orderSlice.reducer;