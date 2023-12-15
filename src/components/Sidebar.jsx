import './Sidebar.css';
import SidebarOptions from './SidebarOptions';
import Logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    return (
        <div className="sidebar">
            <img src={Logo} alt="" className="sidebar_logo" />
            <Link to="/" className='sidebar_links'>
                <SidebarOptions active={location.pathname === '/'} text="Home" icon="home" />
            </Link>
            <Link to="/explore" className='sidebar_links'>
                <SidebarOptions active={location.pathname.includes('/explore')} text="Explore" icon="magnifying-glass" />
            </Link>
            <Link to="/notifications" className='sidebar_links'>
                <SidebarOptions active={location.pathname.includes('/notifications')} text="Notifications" icon="bell" />
            </Link>
            <Link to="/messages" className='sidebar_links'>
                <SidebarOptions active={location.pathname.includes('/messages')} text="Messages" icon="envelope" />
            </Link>
            <Link to="/profile" className='sidebar_links'>
                <SidebarOptions active={location.pathname.includes('/profile')} text="Profile" icon="user" />
            </Link>
            <SidebarOptions text="More" icon="ellipsis" />
            <button className="sidebar_tweet">Post</button>
        </div>
    );
}

export default Sidebar;
// ${location.pathname.includes('/posts') ? 'profile_link-active' : ''