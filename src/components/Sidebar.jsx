import '../styles/Sidebar.css';
import SidebarOptions from './SidebarOptions';
import Logo from '../assets/logo.png';
import Profile from '../assets/demo_profile-picture.jpg'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LogoutModal from './LogoutModal';

const Sidebar = ({ currentUserData, onLogout }) => {
    const user = currentUserData;
    const location = useLocation();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const openLogoutModal = () => {
        setShowLogoutModal(true);
    };
    const closeLogoutModal = () => {
        setShowLogoutModal(false);
    };

    return (
        <div className="sidebar">
            <div className="sidebar_links">
                <Link to="/">
                    <img src={Logo} alt="" className="sidebar_logo" />
                </Link>
                <Link to="/" className='sidebar_link'>
                    <SidebarOptions active={location.pathname === '/'} text="Home" icon="home" />
                </Link>
                <Link to="/explore" className='sidebar_link'>
                    <SidebarOptions active={location.pathname.includes('/explore')} text="Explore" icon="magnifying-glass" />
                </Link>
                <Link to="/notifications" className='sidebar_link'>
                    <SidebarOptions active={location.pathname.includes('/notifications')} text="Notifications" icon="bell" />
                </Link>
                <Link to="/messages" className='sidebar_link'>
                    <SidebarOptions active={location.pathname.includes('/messages')} text="Messages" icon="envelope" />
                </Link>
                <Link to={`/profile/${user?.userID}`} className='sidebar_link'>
                    <SidebarOptions active={location.pathname.includes(`/profile/${user?.userID}`)} text="Profile" icon="user" />
                </Link>
                <button className="sidebar_tweet">Post</button>
            </div>
            <div className="sidebar_logout-wrapper">
                {showLogoutModal && <LogoutModal closeModal={closeLogoutModal} onLogout={onLogout} />}
                <div className="sidebar_info-wrapper" onClick={openLogoutModal}>
                    <img src={Profile} alt="" className="sidebar_profile" />
                    <div className="account_info-wrapper">
                        <h4 className="account_name">{user?.userName}</h4>
                        <span className="account_username">@{user?.userID}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;