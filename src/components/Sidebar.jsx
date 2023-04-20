import React, { useState } from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';
import Profile from './Profile';
import style from '../style.scss'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      <Navbar />
      <Search />
      <Chats />
      <Profile />
    </div>
  );
};

export default Sidebar;
