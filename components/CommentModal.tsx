import { Modal } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCommentModal } from '@/redux/modalSlice.js';

export default function CommentModal() {
  const isOpen = useSelector((state: any) => state.modalSlice.commentModalOpen || false);
  const dispatch = useDispatch();

  return (
    <Modal open={isOpen} onClose={() => dispatch(closeCommentModal())} className='flex justify-center items-center'>
      <div className='w-[90%] sm:w-[50%] h-[50%] min-h-[450px]: bg-twitter-white rounded-lg border-2 border-twitter-dark-gray'>
        
      </div>
    </Modal>
  );
}