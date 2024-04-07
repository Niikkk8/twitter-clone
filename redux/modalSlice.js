import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    commentModalOpen: false,
  },
  reducers: {
    openCommentModal: (state) => {
      state.commentModalOpen = true;
    },
    closeCommentModal: (state) => {
      state.commentModalOpen = false;
    },
  },
});

export const { openCommentModal, closeCommentModal } = modalSlice.actions;

export default modalSlice.reducer;
