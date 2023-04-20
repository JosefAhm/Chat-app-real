import React, { useContext, useState } from "react";
import Cam from "../img/img/cam.png";
import Add from "../img/img/add.png";
import More from "../img/img/more.png";

import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="chatInfo-user">
          <span>
            <img src={data.user?.photoURL} alt="" />
          </span>
          <span>{data.user?.displayName}</span>
        </div>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="Button" onClick={toggleSidebar} />
        </div>
      </div>
      <div className={`sidebar ${isSidebarHidden ? 'sidebar-hidden' : ''}`}>
        {/* your sidebar content */}
      </div>

      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
