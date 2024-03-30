import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice';
import userSlice from './userSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        isLoggedIn: authenticationSlice,
    },
});