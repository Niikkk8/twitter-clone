import React from 'react';
import ProfilePicture from '../assets/demo_profile-picture.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Post.css';

const Post = (props) => {
  const postData = props.post;
  return (
    <div className="post_wrapper">
      <div className="post_image-wrapper">
        <figure className="post_profile-picture-wrapper">
          <img src={ProfilePicture} alt="" className="post_profile-picture" />
        </figure>
      </div>
      <div className="post_content-wrapper">
        <div className="post_content-heading-wrapper">
          <div className="post_content-info-wrapper">
            <span className="post_content-name">{postData?.userName}</span>
            <span className="post_content-username">@{postData?.userID}</span>
          </div>
          <FontAwesomeIcon icon="ellipsis" />
        </div>
        <div className="post_content-wrapper">
          <span className="post_content">{postData?.postContent}</span>
        </div>
        <div className="post_content-footer">
          <FontAwesomeIcon icon={['far', 'heart']} />
          <FontAwesomeIcon icon={['far', 'comment']} />
          <FontAwesomeIcon icon={['fas', 'arrows-rotate']} />
          <FontAwesomeIcon icon={['fas', 'arrow-up-from-bracket']} />
        </div>
      </div>
    </div>
  );
};

export default Post;