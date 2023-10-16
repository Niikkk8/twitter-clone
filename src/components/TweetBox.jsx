import React from 'react';
import './TweetBox.css';
import Profile from '../assets/demo_profile-picture.jpg'

const TweetBox = () => {
    return (
        <div className="tweetbox">
            <form className="tweetbox_form">
                <div className="tweetbox_input-wrapper">
                    <img src={Profile} alt="" className="tweetbox_profile" />
                    <input type="text" placeholder="What is happening?!" className="tweetbox_input" required/>
                </div>
                <button className="tweetbox_button">Post</button>
            </form>
        </div>
    );
}

export default TweetBox;
