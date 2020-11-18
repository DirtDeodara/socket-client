import React from 'react';

import './ReplyInput.css';

const ReplyInput = ({ setMessage, sendMessage, message, buttonColor }) => (
  <form className="form" onSubmit={e => sendMessage(e)}>
    <input
      className="replyInput"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="replyButton" style={{ backgroundColor: buttonColor, color: buttonColor === "#ffed49" ? "#333333" : "white" }}>Reply</button>
  </form>
)

export default ReplyInput;
