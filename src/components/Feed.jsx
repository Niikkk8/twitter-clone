import React from 'react';
import '../styles/Feed.css';
import TweetBox from './TweetBox';
import Post from './Post';

const Feed = (props) => {
    const userData = props.userData;
    const currentUserData = props.currentUserData;
    const userFollowing = currentUserData.userFollowing;
    return (
        <div className="feed">
            <div className="feed_header">
                <h2 className="feed_header-heading">Home</h2>
            </div>
            <TweetBox currentUserData={currentUserData} userData={userData}/>
        </div>
    );
}

export default Feed;