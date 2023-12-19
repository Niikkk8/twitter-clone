import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { auth } from './firebase/Init';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import Explore from './components/Explore';
import Notifications from './components/Notifications';
import Messages from './components/Messages';
import Profile from './components/Profile';
import Login from './components/Login';
import './App.css'

function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const checkLoggedInStatus = () => {
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

  return (
    <>
      {user ? (
        <div className='app'>
          <Sidebar />
          <Routes>
            <Route index element={<Feed />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/notifications/' element={<Notifications />} >
              <Route path='/notifications/all' />
              <Route path='/notifications/verified' />
              <Route path='/notifications/mentions' />
            </Route>
            <Route path='/messages' element={<Messages />} />
            <Route path='/profile/' element={<Profile />}>
              <Route path='/profile/posts' />
              <Route path='/profile/replies' />
              <Route path='/profile/highlights' />
              <Route path='/profile/media' />
              <Route path='/profile/likes' />
            </Route>
          </Routes>
          <Widgets />
        </div>
      ) : (
        <div className='app'>
          <Login />
        </div>
      )}
    </>
  );
}

export default App;
