import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        commentModalOpen: false,
        commentTweetDetails: {
            commentId: null,
            commentTweet: null,
            commentUserUID: null,
            commentUserName: null,
            commentUserID: null,
        }
    },
    reducers: {
        openCommentModal: (state) => {
            state.commentModalOpen = true;
        },
        closeCommentModal: (state) => {
            state.commentModalOpen = false;
        },
        setCommentTweet: (state, action) => {
            state.commentTweetDetails.commentId = action.payload.commentId,
                state.commentTweetDetails.commentTweet = action.payload.commentTweet,
                state.commentTweetDetails.commentUserUID = action.payload.commentUserUID,
                state.commentTweetDetails.commentUserName = action.payload.commentUserName,
                state.commentTweetDetails.commentUserID = action.payload.commentUserID
        }
    },
});

export const { openCommentModal, closeCommentModal, setCommentTweet } = modalSlice.actions;

export default modalSlice.reducer;
