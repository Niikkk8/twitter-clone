import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faMagnifyingGlass, faBell, faUser, faEllipsis, faEnvelope, faArrowsRotate, faArrowUpFromBracket, faArrowLeft, faStar, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { BrowserRouter } from 'react-router-dom';

library.add(faHome, faMagnifyingGlass, faBell, faUser, faEllipsis, faEnvelope, faArrowsRotate, faArrowUpFromBracket, faComment, faHeart, faArrowLeft, faStar, faCircleNotch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
