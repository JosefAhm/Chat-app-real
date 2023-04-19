import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import Profile from "./Profile"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar/>
      <Search/>
      <Chats/>
      <Profile/>
      
    </div>
  )
}

export default Sidebar