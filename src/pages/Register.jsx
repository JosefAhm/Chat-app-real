import React, { useState } from 'react'
import Add from "../img/img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom"

const Register = () => {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];


try {
const res = await createUserWithEmailAndPassword(auth, email, password);

const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers
uploadTask.on(
  
  (error) => {
    setErr(true)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid),{});
      navigate("./");

    });
  }
);


}catch(err){
  console.log(err);
  if (err.code === 'auth/invalid-email') {
    setErr('Invalid email');
  } else {
    setErr(err.message || 'Something went wrong');
  }
}


  };
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">ChatNow</span>
            <span className="title">Regsiter Now</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Username'/>
                <input type="email" placeholder='Your Email'/>
                <input type="password" placeholder='Password'/>
                <input style={{display:"none"}}type="file" id='file'/>
                <label htmlFor="file">
                    <img src={Add} alt="" />
                    <span>Add an avatar</span>
                </label>
                <button>Sign Up</button>
                {err && <span>{err}</span>}
            </form>
            <p>Already Signed Up? <Link to="/Login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register