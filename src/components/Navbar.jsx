import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { AuthContext } from '../context/AuthContext'
import logo from "../img/img/logo.png"


const Navbar = () => {
  const {currentUser} = useContext(AuthContext)


  return (
    <div className="navbar">
      <span className="logo"><img src={logo} alt="" /></span>
    </div>
  )
}

export default Navbar