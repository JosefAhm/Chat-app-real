import React, { useContext, useState } from "react";
import Fuse from "fuse.js";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users")
    );
  
    try {
      const querySnapshot = await getDocs(q);
      const options = {
        keys: ["displayName"],
        includeScore: true,
        threshold: 0.3,
      };
      const fuse = new Fuse(querySnapshot.docs.map((doc) => doc.data()), options);
      const searchResult = fuse.search(username);
      setUser(searchResult.map((result) => result.item));
    } catch (err) {
      setErr(true);
    }
  };
  

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (selectedUser) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > selectedUser.uid
        ? currentUser.uid + selectedUser.uid
        : selectedUser.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
  
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: selectedUser.uid,
            displayName: selectedUser.displayName,
            photoURL: selectedUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
  
        await updateDoc(doc(db, "userChats", selectedUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
  
    setUser(null);
    setUsername("")
  };
  
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && user.map((u) => (
  <div className="userChat" onClick={() => handleSelect(u)}>
    <img src={u.photoURL} alt="" />
    <div className="userChatInfo">
      <span>{u.displayName}</span>
   

          </div>
        </div>
      ))}
    </div>
  );
      }  


export default Search;