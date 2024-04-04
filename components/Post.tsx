import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Moment from 'react-moment';

interface PostProps {
    post: {
        id: string;
        postUserName: string;
        postUserID: string;
        postText: string;
        postTimeStamp: { seconds: number; nanoseconds: number };
    };
}

const Post: React.FC<PostProps> = ({ post }) => {
    return (
        <div className='border-b border-twitter-extra-light-gray'>
            <PostHeader post={post} />
            <div className='text-lg p-3 ml-4 mr-4 text-twitter-dark-gray flex justify-between'>
                <FontAwesomeIcon icon={faComment} className='cursor-pointer hover:text-blue-500 hover:bg-blue-200 p-2 rounded-full' />
                <FontAwesomeIcon icon={faHeart} className='cursor-pointer hover:text-red-500 hover:bg-red-200 p-2 rounded-full' />
                <FontAwesomeIcon icon={faChartSimple} className='cursor-not-allowed p-2' />
                <FontAwesomeIcon icon={faArrowUpFromBracket} className='cursor-not-allowed p-2' />
            </div>
        </div>
    );
}

const PostHeader: React.FC<PostProps> = ({ post }) => {
    const timeStamp = new Date(post.postTimeStamp.seconds * 1000 + post.postTimeStamp.nanoseconds / 1000000);
    
    return (
        <div className='flex space-x-4 p-4 pb-0'>
            <img src="/assets/demo_profile-picture.jpg"
                className='w-14 h-14 rounded-full object-cover'
            />
            <div>
                <div className='flex items-center space-x-2 text-twitter-black mb-2'>
                    <span className='font-semibold '>{post.postUserName}</span>
                    <span className='text-twitter-dark-gray text-sm'>@{post.postUserID}</span>
                    <div className='w-1 h-1 rounded-full bg-twitter-light-gray' />
                    <Moment fromNow>{timeStamp}</Moment>
                </div>
                <span>{post.postText}</span>
            </div>
        </div>
    );
}

export default Post;
