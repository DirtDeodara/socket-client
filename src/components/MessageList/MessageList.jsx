import React, { useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Shoutout from '../Shoutout/Shoutout';
import AdminMessage from '../ChatMessage/ChatMessage';
import "./MessageList.css";

const MessageList = ({ messageList, handleConfetti }) => {

  useEffect(() => { //this is a "fix" for the list not scrolling properly. i couldnt figure out how to fix the ScrollToBottom component to work properly
    window.scrollTo(({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    }));
  }, [messageList])

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
