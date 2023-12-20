import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Banner from '../assets/profile_banner.jpeg'
import ProfilePicture from '../assets/demo_profile-picture.jpg'
import { Link, Routes, Route, useLocation } from 'react-router-dom';


const Profile = ({ currentUserData }) => {
    const location = useLocation();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (currentUserData) {
            setUserData(currentUserData);
        }
    }, [currentUserData]);

    if (!userData) {
        return <h3 className='profile'>Loading...</h3>;
    }


    return (
        <div className='profile'>
            <div className="header_wrapper">
                <FontAwesomeIcon icon="arrow-left" className="back-icon" />
                <div className="header_title-wrapper">
                    <h2 className="header_title">{userData.userName}</h2>
                    <span className="header_posts-number">21 posts</span>
                </div>
            </div>
            <img src={Banner} alt="" className="profile_banner-image" />
            <div className="absolute_postion">
                <div className="profile_information-wrapper">
                    <div className="profile_picture-edit">
                        <img src={ProfilePicture} alt="" className="profile_picture" />
                        <button className="edit-profile">Edit Profile</button>
                    </div>
                    <div className="profile_username-wrapper">
                        <span className="profile_name">{userData.userName}</span>
                        <span className="profile_username">@{userData.userID}</span>
                    </div>
                    <div className="followers-following">
                        <span className="following-number">123</span>
                        <span className="following">Following</span>
                        <span className="followers-number">123</span>
                        <span className="followers">Followers</span>
                    </div>
                    <div className="profile_links">
                        <div className="profile_link-wrapper">
                            <Link to="./posts" className={`profile_link ${(location.pathname === '/profile' || location.pathname.includes('/posts')) ? 'profile_link-active' : ''}`}>Posts</Link>
                        </div>
                        <div className="profile_link-wrapper">
                            <Link to="./replies" className={`profile_link ${location.pathname.includes('/replies') ? 'profile_link-active' : ''}`}>Replies</Link>
                        </div>
                        <div className="profile_link-wrapper">
                            <Link to="./highlights" className={`profile_link ${location.pathname.includes('/highlights') ? 'profile_link-active' : ''}`}>Highlights</Link>
                        </div>
                        <div className="profile_link-wrapper">
                            <Link to="./media" className={`profile_link ${location.pathname.includes('/media') ? 'profile_link-active' : ''}`}>Media</Link>
                        </div>
                        <div className="profile_link-wrapper">
                            <Link to="./likes" className={`profile_link ${location.pathname.includes('/likes') ? 'profile_link-active' : ''}`}>Likes</Link>
                        </div>
                    </div>
                </div>
                <Routes>
                    <Route index element={<h3>Posts Page</h3>} />
                    <Route path='posts' element={<h3>Posts Page</h3>} />
                    <Route path='replies' element={<h3>Replies Page</h3>} />
                    <Route path='highlights' element={<h3>Highlights Page</h3>} />
                    <Route path='media' element={<h3>Media Page</h3>} />
                    <Route path='likes' element={<h3>Likes Page</h3>} />
                </Routes>
            </div>
        </div>
    );
}

export default Profile;
