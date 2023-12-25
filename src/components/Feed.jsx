import React from 'react';
import '../styles/Feed.css';
import TweetBox from './TweetBox';
import Post from './Post';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/Init';

const Feed = (props) => {
    const userData = props.userData;
    const currentUserData = props.currentUserData;
    const userFollowing = currentUserData?.userFollowing;
    const fetchData = async () => {
        const collectionRef = collection(db, 'userPosts');
        const q = query(collectionRef, orderBy('timestamp', 'desc'));
        try {
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log('Sorted data:', data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };
    fetchData();
    return (
        <div className="feed">
            <div className="feed_header">
                <h2 className="feed_header-heading">Home</h2>
            </div>
            <TweetBox currentUserData={currentUserData} />
        </div>
    );
}

export default Feed;