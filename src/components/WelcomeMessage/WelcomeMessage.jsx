import React from "react";
import "./WelcomeMessage.css";

const WelcomeMessage = ({ text, sender }) => {
  return (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sentText pl-10 ">{sender}</p>
    </div>
  );
};

export default WelcomeMessage;
