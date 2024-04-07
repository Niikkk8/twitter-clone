import { Modal } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCommentModal } from '@/redux/modalSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFaceSmile, faImage } from '@fortawesome/free-regular-svg-icons';
import { faChartSimple, faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function CommentModal() {
    const isOpen = useSelector((state: any) => state.modalSlice.commentModalOpen || false);
    const dispatch = useDispatch();

    return (
        <Modal open={isOpen} onClose={() => dispatch(closeCommentModal())} className='flex justify-center items-center'>
            <div className='w-[90%] sm:w-[40%] h-fit min-h-[450px] min-w-fit bg-twitter-white rounded-xl border border-twitter-dark-gray p-4 sm:p-8 relative'>
                <div className='absolute w-[1px] h-[68px] bg-twitter-dark-gray ml-7 mt-[56px]' />
                <div>
                    <div className='flex space-x-4'>
                        <img src="/assets/demo_profile-picture.jpg" className='w-14 h-14 object-cover rounded-full' alt="" />
                        <div>
                            <div className='flex space-x-1.5'>
                                <h1 className='font-bold'>Niket</h1>
                                <h1 className='text-twitter-dark-gray'>@nik8</h1>
                            </div>
                            <p className='mt-2'>Static reply modal</p>
                            <h1 className='text-twitter-dark-gray mt-2 text-[16px]'>Replying to <span className='text-twitter-color'>@nik8</span></h1>
                        </div>
                    </div>
                </div>
                <div className='mt-9'>
                    <div className='flex space-x-4'>
                        <img src="/assets/demo_profile-picture.jpg" className='w-14 h-14 object-cover rounded-full' alt="" />
                        <div className='w-full'>
                            <textarea className='w-full bg-transparent resize-none text-md outline-none' placeholder='Tweet your reply...' />
                            <div className='sm:flex justify-between border-t border-twitter-extra-light-gray pt-4'>
                                <div className='flex justify-around w-full sm:justify-normal'>
                                    <FontAwesomeIcon
                                        icon={faImage}
                                        className='tweetBoxHover p-3 text-twitter-dark-gray text-xl'
                                    />
                                    <FontAwesomeIcon
                                        icon={faChartSimple}
                                        className='tweetBoxHover p-3 px-3.5 text-twitter-dark-gray text-xl'
                                    />
                                    <FontAwesomeIcon
                                        icon={faFaceSmile}
                                        className='tweetBoxHover p-3 text-twitter-dark-gray text-xl'
                                    />
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                        className='tweetBoxHover p-3 px-3.5 text-twitter-dark-gray text-xl'
                                    />
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className='tweetBoxHover p-3 px-4 text-twitter-dark-gray text-xl'
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className='bg-twitter-color text-white rounded-full px-8 py-2 mt-2 sm:mt-0 disabled:opacity-50 cursor-pointer'
                                >
                                    Tweet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}