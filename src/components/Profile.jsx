import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { AuthContext } from '../context/AuthContext'
import logo from "../img/img/logo.png"

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)


  return (
    <div className="profile">
      
      <div className="user">
        
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        
        <div className="logout" style={{marginRight: "auto"}}>
          <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
