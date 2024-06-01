import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers :{
        // when user log in , setting status to true and getting the userData from the payload
        login : (state, actions) =>{
            state.status = true;
            state.userData = actions.payload.userData;
        },

        // when user logout , setting status to false and setting the userData to null again, same as initial state
        logout : (state, actions) =>{
            state.status = false;
            state.userData = null
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice;