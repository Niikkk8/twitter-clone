import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Banner from '../assets/profile_banner.jpg';
import ProfilePicture from '../assets/demo_profile-picture.jpg';
import { Link, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { db } from '../firebase/Init';
import { doc, updateDoc, arrayUnion, arrayRemove, collection, query, orderBy, where, getDocs } from "firebase/firestore";
import Post from './Post';

const Profile = (props) => {
    const location = useLocation();
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [otherUserData, setOtherUserData] = useState(null);
    const [displayUserData, setDisplayUserData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(() => {
        if (props.currentUserData) {
            setUserData(props.currentUserData);
        }
    }, [props.currentUserData]);

    useEffect(() => {
        if (props.otherUserData) {
            setOtherUserData(props.otherUserData.filter(user => user.userID === id));
        }
    }, [props.otherUserData, id]);

    useEffect(() => {
        setDisplayUserData(id === userData?.userID ? userData : id === otherUserData?.[0]?.userID ? otherUserData[0] : null);
        setIsFollowing(userData?.userFollowing.includes(id));
    }, [id, userData, otherUserData]);

    const handleFollow = async () => {
        await updateDoc(doc(db, 'userData', id), {
            userFollowers: arrayUnion(userData.userID)
        });
        await updateDoc(doc(db, 'userData', userData.userID), {
            userFollowing: arrayUnion(id)
        });
        setIsFollowing(true);
    };

    const handleUnfollow = async () => {
        await updateDoc(doc(db, 'userData', id), {
            userFollowers: arrayRemove(userData.userID)
        });
        await updateDoc(doc(db, 'userData', userData.userID), {
            userFollowing: arrayRemove(id)
        });

        setIsFollowing(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionRef = collection(db, 'userPosts');
                const finalQuery = query(collectionRef, orderBy('postTimeStamp', 'desc'), where('userID', '==', displayUserData?.userID));
                const querySnapshot = await getDocs(finalQuery);
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setSortedPosts(data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [displayUserData]);

    if (!displayUserData) {
        return <h3 className='profile' style={{ textAlign: 'center', padding: '50px' }}>USER NOT FOUND</h3>;
    }

    return (
        <div className='profile'>
            <div className="header_wrapper">
                <FontAwesomeIcon icon="arrow-left" className="back-icon" />
                <div className="header_title-wrapper">
                    <h2 className="header_title">{displayUserData?.userName}</h2>
                    <span className="header_posts-number">{sortedPosts?.length} posts</span>
                </div>
            </div>
            <img src={Banner} alt="" className="profile_banner-image" />
            <div className="absolute_postion">
                <div className="profile_information-wrapper">
                    <div className="profile_picture-edit">
                        <img src={ProfilePicture} alt="" className="profile_picture" />
                        {(otherUserData?.length > 0) ?
                            <>{
                                isFollowing ? (
                                    <button className="follow_button" onClick={handleUnfollow}>
                                        Unfollow
                                    </button>
                                ) : (
                                    <button className="follow_button" onClick={handleFollow}>
                                        Follow
                                    </button>
                                )
                            }
                            </>
                            :
                            <button className="edit-profile">Edit Profile</button>
                        }
                    </div>
                    <div className="profile_username-wrapper">
                        <span className="profile_name">{displayUserData?.userName}</span>
                        <span className="profile_username">@{displayUserData?.userID}</span>
                    </div>
                    <div className="followers-following">
                        <span className="following-number">{displayUserData?.userFollowing?.length}</span>
                        <span className="following">Following</span>
                        <span className="followers-number">{displayUserData?.userFollowers?.length}</span>
                        <span className="followers">Followers</span>
                    </div>
                    <div className="profile_links">
                        <div className="profile_link-wrapper">
                            <Link to="./posts" className={`profile_link ${(location.pathname === `/profile/${displayUserData?.userID}` || location.pathname.includes('/posts')) ? 'profile_link-active' : ''}`}>Posts</Link>
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
                    <Route index element={sortedPosts?.map((post) => (
                        <Post key={post.id} post={post} />
                    ))} />
                    <Route path='posts' element={sortedPosts?.map((post) => (
                        <Post key={post.id} post={post} />
                    ))} />
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