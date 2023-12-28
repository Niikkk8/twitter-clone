import React from 'react';
import { auth } from '../firebase/Init';
import '../styles/LogoutModal.css'

const LogoutModal = ({ closeModal, onLogout }) => {
    const handleLogout = async () => {
      try {
        await auth.signOut();
        onLogout();
        closeModal();
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    };
  
    return (
      <div className="logout_modal">
        <h4 className='logout_text'>Are you sure you want to log out?</h4>
        <div className="logout_options">
          <button onClick={handleLogout} className='logout_primary-button'>Logout</button>
          <button onClick={closeModal} className='logout_secondary-button'>Cancel</button>
        </div>
      </div>
    );
  };
  
  export default LogoutModal;