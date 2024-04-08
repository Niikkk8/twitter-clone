import { db } from '@/firebase';
import { openCommentModal, setCommentTweet } from '@/redux/modalSlice';
import { faHeart as faHeartSolid, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { arrayRemove, arrayUnion, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';

interface PostProps {
    post: {
        id: string;
        postUserUID: string;
        postUserName: string;
        postUserID: string;
        postText: string;
        postTimeStamp: { seconds: number; nanoseconds: number };
    };
}

const Post: React.FC<PostProps> = ({ post }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const [postLikes, setPostLikes] = useState<string[]>([]);
    const [postComments, setPostComments] = useState<string[]>([]);
    const [isLiked, setIsLiked] = useState(false);

    async function likePost() {
        const liked = postLikes?.includes(user.userUID);
        await updateDoc(doc(db, "posts", post.id), {
            postLikes: liked ? arrayRemove(user.userUID) : arrayUnion(user.userUID)
        });
    }

    useEffect(() => {
        const unsubscribeLikes = onSnapshot(doc(db, "posts", post.id), (doc) => {
            if (doc.exists()) {
                const likes = doc.data()?.postLikes || [];
                setPostLikes(likes);
                setIsLiked(likes.includes(user.userUID));
            }
        });

        const unsubscribeComments = onSnapshot(doc(db, "posts", post.id), (doc) => {
            if (doc.exists()) {
                const comments = doc.data()?.postComments || [];
                setPostComments(comments);
            }
        });

        return () => {
            unsubscribeLikes();
            unsubscribeComments();
        };
    }, [post.id, user.userUID]);

    return (
        <div className='border-b border-twitter-extra-light-gray cursor-pointer' onClick={() => router.push(`/posts/${post.id}`)}>
            <PostHeader post={post} />
            <div className='text-lg p-3 ml-20 mr-4 sm:mr-20 text-twitter-dark-gray flex justify-between'>
                <div className='flex items-center' onClick={(event) => {
                    event.stopPropagation();
                    dispatch(setCommentTweet({
                        commentId: post.id,
                        commentTweet: post.postText,
                        commentUserUID: post.postUserUID,
                        commentUserName: post.postUserName,
                        commentUserID: post.postUserID,
                    }));
                    dispatch(openCommentModal());
                }}>
                    <FontAwesomeIcon icon={faComment} className='cursor-pointer hover:text-blue-500 hover:bg-blue-200 p-2 rounded-full' />
                    <span className='text-sm'>{postComments.length}</span>
                </div>
                <div className='flex items-center' onClick={(event) => {
                    event.stopPropagation();
                    likePost();
                }}>
                    <FontAwesomeIcon
                        icon={isLiked ? faHeartSolid : faHeartRegular}
                        className={`cursor-pointer hover:text-red-500 hover:bg-red-200 p-2 rounded-full ${isLiked ? 'text-red-500' : ''}`}
                    />
                    <span className='text-sm'>{postLikes.length}</span>
                </div>
                <FontAwesomeIcon icon={faChartSimple} className='cursor-not-allowed p-2' />
                <FontAwesomeIcon icon={faArrowUpFromBracket} className='cursor-not-allowed p-2' />
            </div>
        </div>
    );
}

const PostHeader: React.FC<PostProps> = ({ post }) => {
    const timeStamp = new Date(post.postTimeStamp.seconds * 1000 + post.postTimeStamp.nanoseconds / 1000000);
    const user = useSelector((state: any) => state.user)

    async function deleteTweet(){
        await deleteDoc(doc(db, "posts", post.id))
    }

    return (
        <div className='flex justify-between'>
            <div className='flex space-x-4 p-4 pb-0'>
                <img src="/assets/demo_profile-picture.jpg"
                    className='w-14 h-14 rounded-full object-cover'
                />
                <div>
                    <div className='flex items-center space-x-2 text-twitter-black mb-2'>
                        <span className='font-semibold '>{post.postUserName}</span>
                        <span className='text-twitter-dark-gray text-sm'>@{post.postUserID}</span>
                        <div className='w-1 h-1 rounded-full bg-twitter-light-gray' />
                        <Moment fromNow className='text-sm'>{timeStamp}</Moment>
                    </div>
                    <span>{post.postText}</span>
                </div>
            </div>
            {post.postUserUID === user.userUID &&
                <FontAwesomeIcon icon={faTrash} className='m-2 p-2 hover:text-red-700' onClick={(event) => {
                    event.stopPropagation();
                    deleteTweet()
                }} />
            }
        </div>
    );
}

export default Post;