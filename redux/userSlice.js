import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userID: null,
    userName: null,
    userEmail: null,
    userUID: null,
    userFollowers: null,
    userFollowing: null,
    userPosts: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userID = action.payload.userID
            state.userName = action.payload.userName
            state.userEmail = action.payload.userEmail
            state.userUID = action.payload.userUID
            state.userFollowers = action.payload.userFollowers
            state.userFollowing = action.payload.userFollowing
            state.userPosts = action.payload.userPosts
        },
        signOutUser: (state) => {
            state.userID = null,
                state.userName = null,
                state.userEmail = null,
                state.userUID = null,
                state.userFollowers = null
            state.userFollowing = null
            state.userPosts = null
        }
    }
});

export const { setUser, signOutUser } = userSlice.actions

export default userSlice.reducer