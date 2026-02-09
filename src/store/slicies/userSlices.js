import { createSlice } from "@reduxjs/toolkit";
const userSlice=createSlice({
    name :"userSlice",
    initialState :{
        IsLoggedIn:false,
        user:null,
        isAdmin:false
    },
    reducers :{
        login:(state,action)=>{
            state.user=action.payload;
            state.IsLoggedIn=true;
            state.isAdmin = action.payload.role === "admin" || action.payload.role === "moderator";
        },
        logout:(state)=>{
            state.IsLoggedIn=false;
            state.user=null;
            state.isAdmin=false;
        }
    }
})
//export actions
export const {login,logout}=userSlice.actions;
//export state
export default userSlice.reducer;