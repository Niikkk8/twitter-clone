import React, { useState } from 'react';
import '../styles/Explore.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfilePicture from '../assets/demo_profile-picture.jpg'
import { Link } from 'react-router-dom';

const Explore = ({ userData }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredUserData, setFiltederedUserData] = useState(null)

    const handleInputChange = (event) => {
        setInputValue(event.target.value.toLowerCase().replace(/\s/g, ''));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFiltederedUserData(userData?.filter((user) =>
            user.userID.toLowerCase().includes(inputValue) ||
            user.userName.toLowerCase().includes(inputValue)
        ));
    };

    return (
        <div className="explore">
            <div className="explore_header">
                <h2 className="explore_header-heading">Explore</h2>
            </div>
            <form onSubmit={handleSubmit} className="explore_form">
                <input id="explore_input" type="text" placeholder="Search" className="explore_input" value={inputValue} onChange={handleInputChange} autoComplete='off' />
                <button type="submit" className="explore_submit">
                    <FontAwesomeIcon icon="search" className="search_icon" />
                </button>
            </form>
            <div className="search_result-wrapper">
                {filteredUserData?.map((user) => (
                    <Link to={`/profile/${user.userID}`} className='search_result-link' key={user.userID}>
                        <div className="search_result-user">
                            <img src={ProfilePicture} alt="" className="search_result-picture" />
                            <div className="search_result-userinfo">
                                <h4 className="search_result-username">{user.userName}</h4>
                                <span className="search_result-userID">@{user.userID}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Explore;