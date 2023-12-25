import React, { useState } from 'react';
import '../styles/TweetBox.css';
import Profile from '../assets/demo_profile-picture.jpg'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/Init';

const TweetBox = (props) => {
    const [postContent, setPostContent] = useState('');
    const userData = props.currentUserData;
    const postTweet = async () => {
        if (postContent.trim() === '') {
            return;
        }
        try {
            const userPostsCollection = collection(db, 'userPosts');
            const newPost = {
                userID: userData.userID,
                userName: userData.userName,
                postContent: postContent,
                postTimeStamp: serverTimestamp(),
            };
            await addDoc(userPostsCollection, newPost);
            setPostContent('');
        } catch (error) {
            console.error('Error adding post to Firestore:', error);
        }
    };

    return (
        <div className="tweetbox">
            <form className="tweetbox_form" onSubmit={(event) => { event.preventDefault(); postTweet(); }}>
                <div className="tweetbox_input-wrapper">
                    <img src={Profile} alt="" className="tweetbox_profile" />
                    <input type="text" placeholder="What is happening?!" className="tweetbox_input" value={postContent} onChange={(event) => setPostContent(event.target.value)} required />
                </div>
                <button className="tweetbox_button" type='submit'>Post</button>
            </form>
        </div>
    );
};

export default TweetBox;
