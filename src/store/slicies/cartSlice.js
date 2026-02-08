import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const cartSlice = createSlice({
    name : "cartSlice",
    initialState:{
        cartItems:JSON.parse(localStorage.getItem("cartItems")) || [],
        totalAmount:0,
    },
    reducers :{
        addTocart:(state,action)=>{
            const item = action.payload;
            //check if item already in cart
            const existingProduct = state.cartItems.find((i) => i.id === item.id);  
            if(existingProduct){
                if(existingProduct.quantity==existingProduct.stock){
                    toast.error("Operation limit reached");
                    return;
                }
                //if exist increase quantity
                existingProduct.quantity++;
                toast.success(`Item quantity increased to ${ existingProduct.quantity}`);
            }else{
                // if not exist add to cart
                state.cartItems.push({...item,quantity:1});
                toast.success("Item added to cart");
            }

            // state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);//0 is initial value for total
            cartSlice.caseReducers.calcTotal(state);
            //store in local storage
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                item => item.id !== action.payload
            );
            cartSlice.caseReducers.calcTotal(state);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.success("Item removed from cart");
        },
        increaseQty: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (!item) return;

            if (item.quantity === item.stock) {
                toast.error("Maximum stock reached");
                return;
            }

            item.quantity++;
            cartSlice.caseReducers.calcTotal(state);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decreaseQty: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (!item) return;

            if (item.quantity === 1) {
                toast.error("Quantity cannot be less than 1");
                return;
            }

            item.quantity--;
            cartSlice.caseReducers.calcTotal(state);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart:(state,action)=>{
            state.cartItems=[];
            state.totalAmount=0;
        },
        calcTotal:(state)=>{
            state.totalAmount= state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);//0 is initial value for total
            
        },
    },
    
})

export const {clearCart,calcTotal,addTocart,removeFromCart,increaseQty,decreaseQty} = cartSlice.actions
export default cartSlice.reducer