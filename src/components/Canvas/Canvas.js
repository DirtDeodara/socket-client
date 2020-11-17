import React, { useState } from 'react';

import './Canvas.css';

const Canvas = ({ setMessage, sendMessage, message }) => {
  const [recipient, setRecipient] = useState("");
  return (
      <div className="canvas-container">
        <section className="canvas-section" id="msg-form">
          <div className="msg-options">
            <input
              id="recipient-input"
              className="input"
              type="text"
              value={recipient}
              placeholder="Shoutout to..."
              onChange={({ taget: { value } }) => setRecipient(value)}
            />
            <select id="color-input" className="input">
              <option>BG color</option>
              <option value="#FFFF33">Yellow</option>
              <option value="#FF66CC">Pink</option>
              <option value="#FF9933">Orange</option>
              <option value="#33CCFF">Blue</option>
              <option value="#33FF66">Green</option>
              <option value="#CC66FF">Purple</option>
            </select>
          </div>
          <div>
            <textarea
              id="message-body"
              className="input"
              rows="5"
              placeholder="Type a message..."
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
          </div>
        </section>
        <section className="canvas-section">
          <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
        </section>
      </div>
  )
}

export default Canvas;