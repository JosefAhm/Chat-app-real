import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../img/img/logo.png"

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
        console.log(err);
        if (err.code === 'auth/invalid-email') {
          setErr('Invalid email');
        } 
        if (err.code === 'auth/email-already-in-use') {
          setErr('Email already in use');
        } 
        if (err.code === 'auth/missing-email') {
          setErr('Please fill out all fields');
        } 
        if (err.code === 'auth/weak-password') {
          setErr(' Password should be at least 6 characters');
        } 
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo"><img src={logo} alt="" /></span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>{err}</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;