import React from 'react';
import {ReactComponent as SendIcon} from "../../icons/send.svg";
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
    <button style={{background: "transparent", border: "none"}}>
      <SendIcon
        alt="comment"
        fill="white"
        width="30px"
      />

    </button>
  </form>
)

export default ReplyInput;
