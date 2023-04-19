import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from "../firebase";

const Login = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/wrong-password') {
              setErrorMessage('Incorrect password or email');
            } 
            if (error.code === 'auth/too-many-requests') {
              setErrorMessage('Too many requests. Please try again later.');
            } 

        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">ChatNow</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Your Email" />
                    <input type="password" placeholder="Password" />
                    <button>Log In</button>
                    {errorMessage && <span className="errorMessage">{errorMessage}</span>}
                </form>
                <p>No account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;
