import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name :"userSlice",
    initialState :{
        IsLoggedIn:false,
        user:null
    },
    reducers :{
        login:(state,action)=>{
            state.user=action.payload.user;
            state.IsLoggedIn=true;
        },
        logout:(state)=>{
            state.IsLoggedIn=false;
            state.user=null;
        }
    }
})
//export actions
export const {login,logout}=userSlice.actions;
//export state
export default userSlice.reducer;