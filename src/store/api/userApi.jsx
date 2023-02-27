import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" ,
  tagTypes: ['Users'],
  prepareHeaders: (headers, { getState }) => {
    // Get the access token from your store
    const { accessToken } = getState().auth;
    console.log('Authorization', `Bearer ${accessToken}`)
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
      transformResponse: (response) => response.data,
    }),
    loginUser : builder.mutation({
      query: (value) => ({
        url : "/login",
        method : "POST",
        body : value,
      })
    }),
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
    useGetUsersQuery, 
    useCreateUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useLoginUserMutation} = userApi;
