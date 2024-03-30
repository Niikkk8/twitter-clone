import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userID: null,
    userName: null,
    userEmail: null,
    userUID: null,
    userPhotoURL: null
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
            state.userPhotoURL = action.payload.userPhotoURL
        },
        signOutUser: (state) => {
            state.userID = null,
                state.userName = null,
                state.userEmail = null,
                state.userUID = null,
                state.userPhotoURL = null
        }
    }
});

export const { setUser, signOutUser } = userSlice.actions

export default userSlice.reducer