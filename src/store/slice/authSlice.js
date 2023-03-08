import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import  {useGetUsersQuery, userApi}  from "../api/userApi";

const initialState = {
    user: null,
    accessToken : null,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        setUser: (state, action) =>{
            state.user = action.payload ;
        },
        setAccessToken: (state, action) =>{
            state.accessToken = action.payload;
        },
        logOut: () => initialState
    },
    //extraReducers addMatcher when the api success/fulfilled it will return true and we can
    //we can get value of the api that been fulfilled and store it to the state
    extraReducers: (builder) => {
        builder.addMatcher(userApi.endpoints.loginUser.matchFulfilled, (state, action) => {
            const token = jwtDecode(action.payload.accessToken);
            state.user = token // update the users field with the fetched data
        })
    //     builder.addMatcher(userApi.endpoints.userRefresh.matchFulfilled, (state, action) =>{
            
    //         const {exp} = jwtDecode(state.accessToken) 
    //     }) 
      }, 
})

export const { setUser, setAccessToken, logOut } = authSlice.actions;

export default authSlice.reducer

export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
