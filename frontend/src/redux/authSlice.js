import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name : "auth",
    initialState : {
        user:null,
        loading:false
    },
    reducers : {
        setLoading : (action,state)=>{
            state.loading=action.payload
        },
        setUser : (action,state)=>{
            state.user=action.payload
        },
        logout : (action,state)=>{
            state.user=null
        }
    }
})

export const {setLoading} = authSlice.actions;
export default authSlice.reducer