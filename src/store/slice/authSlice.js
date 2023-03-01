import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {
    user: null,
    accessToken : null,
    refreshToken : null
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
        }
    }
})

export const { setUser, setAccessToken, setRefreshToken } = authSlice.actions;

export default authSlice.reducer

export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
