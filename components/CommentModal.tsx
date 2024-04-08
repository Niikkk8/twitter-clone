import { Modal } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCommentModal } from '@/redux/modalSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFaceSmile, faImage } from '@fortawesome/free-regular-svg-icons';
import { faChartSimple, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons';
import { db } from '@/firebase';
import { arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function CommentModal() {
    const router = useRouter()
    const dispatch = useDispatch();
    const isOpen = useSelector((state: any) => state.modalSlice.commentModalOpen || false);
    const tweetDetails = useSelector((state: any) => state.modalSlice.commentTweetDetails);
    const user = useSelector((state: any) => state.user);
    const [comment, setComment] = useState('');

    async function sendComment(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const docRef = doc(db, "posts", tweetDetails.commentId);
        const commentDetails = {
            commentUserID: user.userID,
            commentUserName: user.userName,
            commentText: comment
        }
        await updateDoc(docRef, {
            postComments: arrayUnion(commentDetails)
        })
        setComment('');
        router.push(`/posts/${tweetDetails.commentId}`)
        dispatch(closeCommentModal());
    }

    return (
        <Modal open={isOpen} onClose={() => dispatch(closeCommentModal())} className='flex justify-center items-center outline-none border-none'>
            <form onSubmit={sendComment}>
                <div className='w-[90%] sm:w-[40%] h-fit min-h-[450px] min-w-fit bg-twitter-white rounded-xl border border-twitter-black p-4 sm:p-8 relative'>
                    <div className='absolute w-[1px] h-[140px] bg-twitter-dark-gray ml-7 mt-[60px] z-0' />
                    <div className='absolute top-6 right-6 sm:right-10 cursor-pointer' onClick={() => dispatch(closeCommentModal())}>
                        <FontAwesomeIcon icon={faXmark} className='w-6 h-6' />
                    </div>
                    <div className='mt-8'>
                        <div className='flex space-x-4'>
                            <img src="/assets/demo_profile-picture.jpg" className='w-14 h-14 object-cover rounded-full z-10' alt="" />
                            <div>
                                <div className='flex space-x-1.5'>
                                    <h1 className='font-bold'>{tweetDetails.commentUserName}</h1>
                                    <h1 className='text-twitter-dark-gray'>@{tweetDetails.commentUserID}</h1>
                                </div>
                                <p className='mt-2'>{tweetDetails.commentTweet}</p>
                                <h1 className='text-twitter-dark-gray mt-2 text-[16px]'>Replying to <span className='text-twitter-color'>@{tweetDetails.commentUserID}</span></h1>
                            </div>
                        </div>
                    </div>
                    <div className='mt-9'>
                        <div className='flex space-x-4'>
                            <img src="/assets/demo_profile-picture.jpg" className='w-14 h-14 object-cover rounded-full z-10' alt="" />
                            <div className='w-full'>
                                <textarea
                                    className='w-full bg-transparent resize-none text-md outline-none'
                                    placeholder='Tweet your reply...'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
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
                                        disabled={!comment}
                                        className='bg-twitter-color text-white rounded-full px-8 py-2 mt-2 sm:mt-0 disabled:opacity-50 cursor-pointer'
                                    >
                                        Tweet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
