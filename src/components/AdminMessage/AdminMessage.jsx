import React from "react";
import "./AdminMessage.css";

const AdminMessage = ({ author, text }) => {
  return (
    <div className="messageContainer justifyStart">
      <div className={`messageBox ${author === "Kent" ? "backgroundLight" : "backgroundDark"}`}>
        <p className={`messageText ${author === "Kent" ? "colorDark" : "colorLight"}`}>{text}</p>
      </div>
      <p className="sentText pl-10 ">{author}</p>
    </div>
  );
};

export default AdminMessage;
