import React from 'react';
import './Canvas.css';

const Canvas = ({ setNewShoutout, sendShoutout, newShoutout }) => {
  
  const { recipient, color, message } = newShoutout;

  const handleInputChange = (e) => {
    setNewShoutout({
      ...newShoutout,
      [e.target.name]: e.target.value,
    });
  };

  return (
      <div className="canvas-container">
        <section className="canvas-section" id="msg-form">
          <div className="msg-options">
            <input
              id="recipient-input"
              className="input"
              name="recipient"
              type="text"
              value={recipient}
              placeholder="Shoutout to..."
              onChange={handleInputChange}
            />
            <select
              className="input"
              id="color-input"
              name="color"
              onChange={handleInputChange}
              value={color}
            >
              <option>BG color</option>
              <option value="purple">Purple</option>
              <option value="darkOrange">Dark Orange</option>
              <option value="orange">Orange</option>
              <option value="yellow">Yellow</option>
              <option value="lightBlue">Light Blue</option>
              <option value="blue">Blue</option>
            </select>
          </div>
          <div>
            <textarea
              id="message-body"
              className="input"
              rows="5"
              placeholder="Type a message..."
              name="message"
              value={message}
              onChange={handleInputChange}
              onKeyPress={event => event.key === 'Enter' ? sendShoutout(event) : null}
            />
          </div>
        </section>
        <section className="canvas-section">
          <button className="sendButton" onClick={e => sendShoutout(e)}>Send</button>
        </section>
      </div>
  )
}

export default Canvas;
