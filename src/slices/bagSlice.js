import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0
}
const bagSlice= createSlice({
    name: "bag",
    initialState: initialState,
    reducers: {
        setTotalItems(state,value){
            state.totalItems= value.payload;
        }
        // add to bag
        // remove from bag
        // reset bag
    }
})

export const {setTotalItems}= bagSlice.actions;
export default bagSlice.reducer;
