import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Post from '@/components/Post';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';

interface PostData {
    id: string;
    postUserUID: string,
    postUserName: string;
    postUserID: string;
    postText: string;
    postTimeStamp: { seconds: number; nanoseconds: number };
    postComments: CommentData[];
}

interface CommentData {
    commentUserName: string;
    commentUserID: string;
    commentText: string;
}

export default function PostPage() {
    const user = useSelector((state: any) => state.user);
    const router = useRouter();
    const { postId } = router.query;
    const [post, setPost] = useState<PostData | null>(null);
    const [reply, setReply] = useState('');

    useEffect(() => {
        async function fetchPost() {
            try {
                if (postId) {
                    const docRef = doc(db, 'posts', postId as string);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setPost(docSnap.data() as PostData);
                    } else {
                        console.log("No such document!");
                    }
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        }

        fetchPost();
    }, [postId]);

    return (
        <div className="w-[100%] md:w-[60%] md:border-r md:border-twitter-extra-light-gray overflow-y-scroll h-screen no-scrollbar pb-20 md:pb-0">
            <div className="px-3 py-1 space-x-1 border-b border-twitter-extra-light-gray sticky top-0 z-50 bg-twitter-white flex items-center">
                <Link href="/" className="p-3 px-4 hover:bg-twitter-black hover:bg-opacity-20 rounded-full">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
                </Link>
                <h1 className='font-bold text-xl mb-[4px]'>Post</h1>
            </div>
            {post && (
                <div className='border-b border-twitter-extra-light-gray pb-6'>
                    <div className='flex space-x-4 p-4 pb-0'>
                        <img src="/assets/demo_profile-picture.jpg"
                            className='w-14 h-14 rounded-full object-cover'
                        />
                        <div>
                            <div className='flex items-center space-x-2 text-twitter-black mb-1'>
                                <span className='font-semibold '>{post.postUserName}</span>
                                <span className='text-twitter-dark-gray text-sm'>@{post.postUserID}</span>
                                <div className='w-1 h-1 rounded-full bg-twitter-light-gray' />
                                <Moment fromNow className='text-sm'>{new Date(post.postTimeStamp.seconds * 1000 + post.postTimeStamp.nanoseconds / 1000000)}</Moment>
                            </div>
                            <span>{post.postText}</span>
                        </div>
                    </div>
                </div>
            )}
            <div className='border-b border-twitter-extra-light-gray p-4 font-semibold text-lg'>Replies to this post:</div>
            {post?.postComments ?
                (post.postComments.reverse().map((comment, index) => (
                    <div key={index} className='border-b border-twitter-extra-light-gray pb-6'>
                        <div className='flex space-x-4 p-4 pb-0'>
                            <img src="/assets/demo_profile-picture.jpg"
                                className='w-14 h-14 rounded-full object-cover'
                            />
                            <div>
                                <div className='flex items-center space-x-2 text-twitter-black mb-1'>
                                    <span className='font-semibold '>{comment.commentUserName}</span>
                                    <span className='text-twitter-dark-gray text-sm'>@{comment.commentUserID}</span>
                                </div>
                                <span>{comment.commentText}</span>
                            </div>
                        </div>
                    </div>)
                ))
                :
                <div className='font-semibold text-md p-6'>No replies were made to this post :/</div>
            }
        </div>
    );
}