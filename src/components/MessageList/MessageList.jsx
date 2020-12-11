import React, { useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Shoutout from '../Shoutout/Shoutout';
import AdminMessage from '../ChatMessage/ChatMessage';
import "./MessageList.css";

const MessageList = ({ messageList, handleConfetti }) => {

  return (
    <ScrollToBottom checkInterval={200} className="messageList" followButtonClassName="scrollButton">
      {messageList.map((messageItem, i) => {
        return messageItem.variant === "chat" ? (
          <div key={i} className="messageItem">
            <AdminMessage {...messageItem} />
          </div>
        ) : (
            <div key={i} className="messageItem">
              <Shoutout {...messageItem } handleConfetti={handleConfetti}/>
            </div>
          )
      }
      )}
    </ScrollToBottom>
  )
};

export default MessageList;
