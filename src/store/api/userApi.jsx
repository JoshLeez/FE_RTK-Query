import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setUser } from "../slice/authSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" ,
  credentials: "include",
  tagTypes: ['Users'],
  prepareHeaders: (headers, { getState }) => {
    // Get the access token from your store
    const { accessToken } = getState().auth;
    // console.log('Authorization', `Bearer ${accessToken}`) 
    // If there is an access token, set the authorization header
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  }
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      // this is used when when we want to validate and update UI
      providesTags:["Users"],
      //this is used to specify which object we wanna show
      transformResponse: (response) => response.data
    }),
    registerUser : builder.mutation({
      query : (value) =>({
        url : "/register",
        method : "POST",
        body : value,
      })
    }),
    loginUser : builder.mutation({
      query: (value) => ({
        url : "/login",
        method : "POST",
        body : value,
      }),
      invalidatesTags: ["Users"],
    }),
    logOutUser : builder.mutation({
      query: () =>({
          url : "/logout",
          method :"DELETE"
      }),
      invalidatesTags: ["Users"],
      async onQueryStarted(arg, {dispatch, queryFulfilled}){
        try{
            const {data} = await queryFulfilled;
            console.log(data);
            setTimeout(() =>{
              dispatch(logOut())})
            setTimeout(() => {
              dispatch(userApi.util.resetApiState())
          }, 1000)
        }catch(err){  
          console.log(err)  
        }
      }
    }),
    getUserByLogin : builder.query({
      query: ()=> "/users-by-login",
      providesTags: ["Users"],
      transformResponse : (response) => response
    })
    ,
    createUser: builder.mutation({
      query: (value) => ({
        url: "/users",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["Users"]
    }),
    deleteUser : builder.mutation({
      query: (id) =>({
        url: `/users/${id}`,
        method : "DELETE",
      }),
      invalidatesTags: ["Users"]
    }),
    updateUser : builder.mutation({
      query: ({id, value}) =>({
        url: `/users/${id}`,
        method: "PATCH",
        body : value
      }),
      invalidatesTags: ["Users"]
    })
  }),
});

export const { 
    useRegisterUserMutation,
    useGetUsersQuery, 
    useCreateUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useLoginUserMutation,
    useLogOutUserMutation,
    useGetUserByLoginQuery} = userApi;
