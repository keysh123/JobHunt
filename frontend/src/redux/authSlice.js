import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name : "auth",
    initialState : {
        user:null,
        loading:false
    },
    reducers : {
        setLoading : (state,action)=>{
            state.loading=action.payload
        },
        setUser : (state,action)=>{
           
            state.user=action.payload
        },
        logout : (action,state)=>{
            state.user=null
        }
    }
})

export const {setLoading , setUser} = authSlice.actions;
export default authSlice.reducer