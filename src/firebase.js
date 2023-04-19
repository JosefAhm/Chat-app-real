// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1I9qtpqF1vDXBatleTSUzG1_kPiQ6u7k",
  authDomain: "chatapplication-9c629.firebaseapp.com",
  projectId: "chatapplication-9c629",
  storageBucket: "chatapplication-9c629.appspot.com",
  messagingSenderId: "370726086859",
  appId: "1:370726086859:web:e5831d5c223f6c019d134e",
  measurementId: "G-SSV0LB3P4M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore()