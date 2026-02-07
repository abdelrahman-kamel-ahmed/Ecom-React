import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./slicies/userSlices.js";
// Global store -> include all reducers(states,slices) here
export const store = configureStore({
  reducer: {
    user: useReducer,

  },
});