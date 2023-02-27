import { configureStore } from "@reduxjs/toolkit";
import  {userApi}  from "./api/userApi";
import authReducer from "./slice/authSlice";

export default configureStore({
    reducer:{
        auth: authReducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware)
});

