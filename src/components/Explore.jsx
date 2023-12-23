import React, { useState } from 'react';
import '../styles/Explore.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfilePicture from '../assets/demo_profile-picture.jpg'

const Explore = ({ otherUserData }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredUserData, setFiltederedUserData] = useState(null)

    const handleInputChange = (event) => {
        setInputValue(event.target.value.toLowerCase().replace(/\s/g, ''));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFiltederedUserData(otherUserData.filter((user) =>
            user.userID.toLowerCase().includes(inputValue) ||
            user.userName.toLowerCase().includes(inputValue)
        ));
    };
    filteredUserData?.forEach((user) => {
        console.log(user);
    })

    return (
        <div className="explore">
            <div className="explore_header">
                <h2 className="explore_header-heading">Explore</h2>
            </div>
            <form onSubmit={handleSubmit} className="explore_form">
                <input id="explore_input" type="text" placeholder="Search" className="explore_input" value={inputValue} onChange={handleInputChange} />
                <button type="submit" className="explore_submit">
                    <FontAwesomeIcon icon="search" className="search_icon" />
                </button>
            </form>
            <div className="search_result-wrapper">
                
            </div>
        </div>
    );
};

export default Explore;