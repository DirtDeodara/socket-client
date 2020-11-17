import React from 'react';

import './ReplyInput.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form" onSubmit={e => sendMessage(e)}>
    <input
      className="replyInput"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="replyButton">Reply</button>
  </form>
)

export default Input;
