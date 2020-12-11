import React from "react";
import "./ChatMessage.css";

const ChatMessage = ({ author, text }) => {
  return (
    <div className="messageContainer justifyStart">
      <div className={"messageBox backgroundLight"}>
        <p className={"messageText colorDark"}>{text}</p>
      </div>
      <p className="sentText pl-10 ">{author}</p>
    </div>
  );
};

export default ChatMessage;
