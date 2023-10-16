import React from 'react';
import ProfilePicture from '../assets/demo_profile-picture.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Post.css';

const Post = () => (
  <div className="post_wrapper">
    <div className="post_image-wrapper">
      <figure className="post_profile-picture-wrapper">
        <img src={ProfilePicture} alt="" className="post_profile-picture" />
      </figure>
    </div>
    <div className="post_content-wrapper">
      <div className="post_content-heading-wrapper">
        <div className="post_content-info-wrapper">
          <span className="post_content-name">Niket Shah</span>
          <span className="post_content-username">@nik8</span>
        </div>
        <FontAwesomeIcon icon="ellipsis" />
      </div>
      <div className="post_content-wrapper">
        <span className="post_content">This is a static demo tweet ;D</span>
      </div>
      <div className="post_content-footer">
        <FontAwesomeIcon icon={['far', 'comment']} />
        <FontAwesomeIcon icon={['fas', 'arrows-rotate']} />
        <FontAwesomeIcon icon={['far', 'heart']} />
        <FontAwesomeIcon icon={['fas', 'arrow-up-from-bracket']} />
      </div>
    </div>
  </div>
);

export default Post;