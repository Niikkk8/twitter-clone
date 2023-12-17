import React from 'react';
import '../styles/Explore.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Explore = () => {
    return (
        <div className='explore'>
            <div className="explore_header">
                <h2 className="explore_header-heading">Explore</h2>
            </div>
            <div className="search_wrapper">
                <input type="text" placeholder='Search' className="explore_input" />
                <FontAwesomeIcon icon="search" className='search_icon' />
            </div>
        </div>
    );
}

export default Explore;