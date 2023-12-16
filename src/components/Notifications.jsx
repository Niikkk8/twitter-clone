import React from 'react';
import './Notifications.css';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

const Notifications = () => {
    const location = useLocation();
    return (
        <div className='notifications'>
            <div className="notifications_header">
                <h2 className="notifications_header-title">Notifications</h2>
            </div>
            <div className="notifications_links">
                <Link to='./all' className={`notifications_link ${(location.pathname === '/notifications' || location.pathname.includes('/all')) ? 'notifications_link-active' : ''}`}>All</Link>
                <Link to='./verified' className={`notifications_link ${location.pathname.includes('/verified') ? 'notifications_link-active' : ''}`}>Verified</Link>
                <Link to='./mentions' className={`notifications_link ${location.pathname.includes('mentions') ? 'notifications_link-active' : ''}`}>Mentions</Link>
            </div>
            <Routes>
                <Route index element={<h3>All Notifications</h3>} />
                <Route path='all' element={<h3>All Notifications</h3>} />
                <Route path='verified' element={<h3>Verified Notifications</h3>} />
                <Route path='mentions' element={<h3>Mentions Notifications</h3>} />
            </Routes>
        </div>
    );
}

export default Notifications;
