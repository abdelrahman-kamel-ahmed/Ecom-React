import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./slicies/userSlices.js";
import cartReducer from "./slicies/cartSlice.js";
// Global store -> include all reducers(states,slices) here
export const store = configureStore({
  reducer: {
    user: useReducer,//useSelector(state=>state.user)
    cart: cartReducer,//useSelector(state=>state.cart)

  },
});