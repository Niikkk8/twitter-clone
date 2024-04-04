import { db } from '@/firebase';
import { setUser } from '@/redux/userSlice';
import { faCalendar, faChartSimple, faFaceSmile, faImage, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TweetBox() {
    const user = useSelector((state: any) => state.user)
    const [tweetInput, setTweetInput] = useState<string>('');
    const dispatch = useDispatch();

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTweetInput(event.target.value);
    };

    const handleTweetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                postUserUID: user.userUID,
                postUserID: user.userID,
                postUserName: user.userName,
                postTimeStamp: serverTimestamp(),
                postLikes: [],
                postText: tweetInput
            });
            const postId = docRef.id;
            await updateDoc(doc(db, 'users', user.userUID), {
                userPosts: arrayUnion(postId)
            });
            dispatch(
                setUser({
                    userPosts: [...user.userPosts, postId]
                })
            );
            setTweetInput("");
        } catch (error) {
            console.error("Error adding tweet:", error);
        }
    };

    return (
        <div className='flex space-x-4 p-4 border-b border-twitter-extra-light-gray'>
            <img
                src='/assets/demo_profile-picture.jpg'
                className='w-14 h-14 rounded-full object-cover'
                alt=''
            />
            <div className='w-full'>
                <textarea
                    className='bg-transparent resize-none outline-none w-full min-h-[48px] text-lg p-2'
                    placeholder="What's on your mind?"
                    name='tweetInput'
                    id='tweetInput'
                    value={tweetInput}
                    onChange={handleInputChange}
                />
                <div className='flex flex-col sm:flex-row items-end sm:items-start justify-between border-t border-twitter-extra-light-gray pt-3'>
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
                        className='bg-twitter-color text-white rounded-full px-8 py-2 mt-2 sm:mt-0 disabled:opacity-50 cursor-pointer'
                        onClick={handleTweetSubmit}
                        disabled={!tweetInput}
                    >
                        Tweet
                    </button>
                </div>
            </div>
        </div>
    );
}
