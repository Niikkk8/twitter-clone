import './App.css';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import Explore from './components/Explore';
import Notifications from './components/Notifications';
import Messages from './components/Messages';
import Profile from './components/Profile';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Routes>
        <Route index element={<Feed />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/profile' element={<Profile />}>
          <Route path='/profile/posts' />
          <Route path='/profile/replies' />
          <Route path='/profile/highlights' />
          <Route path='/profile/media' />
          <Route path='/profile/likes' />
        </Route>
      </Routes>
      <Widgets />
    </div>
  );
}

export default App;