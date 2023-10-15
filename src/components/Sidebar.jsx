import React from 'react';
import './Sidebar.css';
import SidebarOptions from './ui/SidebarOptions';

const Sidebar = () => {
    return (
        <div>
            <SidebarOptions active text="Home" icon="home"/>
            <SidebarOptions text="Explore" icon="magnifying-glass"/>
            <SidebarOptions text="Notifications" icon="bell"/>
            <SidebarOptions text="Messages" icon="envelope"/>
            <SidebarOptions text="Profile" icon="user"/>
            <SidebarOptions text="More" icon="ellipsis"/>

            <button className="sidebar_tweet">Post</button>
        </div>
    );
}

export default Sidebar;
