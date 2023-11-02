import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './SidebarOptions.css';

const SidebarOptions = ({ active, icon, text }) => {
    return (
        <div className={`sidebar_options ${active ? 'active' : ''}`}>
            <FontAwesomeIcon icon={icon} className="sidebar_icon" />
            <h2 className="sidebar_text">{text}</h2>
        </div>
    );
}

export default SidebarOptions;
