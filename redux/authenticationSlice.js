import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false
}

const authenticationSlice = createSlice({
    name: "isLoggedIn",
    initialState,
    reducers: {
        setAuthenticationStatus: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated
        }
    }
});

export const { setAuthenticationStatus } = authenticationSlice.actions

export default authenticationSlice.reducer