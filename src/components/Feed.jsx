import React, { useEffect, useState } from 'react';
import '../styles/Feed.css';
import TweetBox from './TweetBox';
import Post from './Post';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase/Init';

const Feed = (props) => {
    const [sortedPosts, setSortedPosts] = useState([]);
    const currentUserData = props.currentUserData;
    const currentUserFollowing = props.currentUserData?.userFollowing;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionRef = collection(db, 'userPosts');
                let finalQuery;

                if (currentUserFollowing && currentUserFollowing.length > 0) {
                    finalQuery = query(collectionRef, orderBy('postTimeStamp', 'desc'), where('userID', 'in', [currentUserData?.userID, ...currentUserFollowing]));
                } else {
                    finalQuery = query(collectionRef, orderBy('postTimeStamp', 'desc'), where('userID', '==', currentUserData?.userID));
                }
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
    }, [currentUserFollowing, currentUserData]);

    return (
        <div className="feed">
            <div className="feed_header">
                <h2 className="feed_header-heading">Home</h2>
            </div>
            <TweetBox currentUserData={currentUserData} />
            {(sortedPosts?.length > 0) ?
                (sortedPosts?.map((post) => (
                    <Post key={post.id} post={post} />
                )))
                :
                <Post
                    post={{
                        userName: 'Niket Shah',
                        userID: 'nik8',
                        postContent: "This is a static post. If you dont see any posts, it's probably because you dont follow anyone yet, or the people you follow havent posted anything. It's suggested that you follow someone or you can post something too"
                    }}
                />
            }
        </div>
    );
};

export default Feed;
