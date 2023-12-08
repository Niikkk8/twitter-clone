import React from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Banner from '../assets/profile_banner.jpeg'
import ProfilePicture from '../assets/demo_profile-picture.jpg'
import Post from './Post';

const Profile = () => {
    return (
        <div className='profile'>
            <div className="header_wrapper">
                <FontAwesomeIcon icon="arrow-left" className="back-icon" />
                <div className="header_title-wrapper">
                    <span className="header_title">Niket Shah</span>
                    <span className="header_posts-number">21 posts</span>
                </div>
            </div>
            <img src={Banner} alt="" className="profile_banner-image" />
            <div className="profile_information-wrapper">
                <div className="profile_picture-edit">
                    <img src={ProfilePicture} alt="" className="profile_picture" />
                    <button className="edit-profile">Edit Profile</button>
                </div>
                <div className="profile_username-wrapper">
                    <span className="profile_name">Niket Shah</span>
                    <span className="profile_username">@nik8</span>
                </div>
                <div className="followers-following">
                    <span className="following-number">123</span>
                    <span className="following">Following</span>
                    <span className="followers-number">123</span>
                    <span className="followers">Followers</span>
                </div>
                <div className="profile_links">
                    <a href="/" className="profile_link">Posts</a>
                    <a href="/" className="profile_link">Replies</a>
                    <a href="/" className="profile_link">Highlights</a>
                    <a href="/" className="profile_link">Media</a>
                    <a href="/" className="profile_link">Likes</a>
                </div>
            </div>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    );
}

export default Profile;
