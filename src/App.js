import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { auth, db } from './firebase/Init';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import Explore from './components/Explore';
import Notifications from './components/Notifications';
import Messages from './components/Messages';
import Profile from './components/Profile';
import Login from './components/Login';
import './App.css';
import { collection, getDocs } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [otherUserData, setOtherUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = (user) => {
    setUser(true);
  };

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            resolve(true);
          } else {
            resolve(false);
          }
          unsubscribe();
        });
      });
    };

    const setUserStatus = async () => {
      const isLoggedIn = await checkLoggedInStatus();
      setUser(isLoggedIn);
    };

    setUserStatus();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataCollection = collection(db, 'userData');
        const querySnapshot = await getDocs(userDataCollection);
        const userDataArray = querySnapshot.docs.map((doc) => doc.data());
        const otherUserDataArray = userDataArray.filter((user) => user.userEmail !== auth?.currentUser?.email);
        setOtherUserData(otherUserDataArray);
        setUserData(userDataArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const foundUserData = userData.find((user) => user.userEmail === auth?.currentUser?.email);
    setCurrentUserData(foundUserData || null);
  }, [userData]);

  // console.log(currentUserData)
  // console.log(otherUserData)

  return (
    <>
      {loading ? (
        <FontAwesomeIcon icon="circle-notch" className='app_loader' />
      ) : (
        <>
          {user ? (
            <div className='app'>
              <Sidebar currentUserData={currentUserData} />
              <Routes>
                <Route index element={<Feed />} />
                <Route path='/feed' element={<Feed />} />
                <Route path='/explore' element={<Explore otherUserData={otherUserData} />} />
                <Route path='/notifications/' element={<Notifications />} >
                  <Route path='/notifications/all' />
                  <Route path='/notifications/verified' />
                  <Route path='/notifications/mentions' />
                </Route>
                <Route path='/messages' element={<Messages />} />
                <Route path='/profile/:id' element={<Profile currentUserData={currentUserData} otherUserData={otherUserData} />}>
                  <Route path='/profile/:id/posts' />
                  <Route path='/profile/:id/replies' />
                  <Route path='/profile/:id/highlights' />
                  <Route path='/profile/:id/media' />
                  <Route path='/profile/:id/likes' />
                </Route>
              </Routes>
              <Widgets />
            </div>
          ) : (
            <div className='app'>
              <Login onLogin={handleLogin} />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
