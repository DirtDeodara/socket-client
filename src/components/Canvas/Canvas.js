import React from 'react';
import './Canvas.css';

const Canvas = ({ setNewShoutout, sendShoutout, newShoutout }) => {
  
  const { color, recipient, text } = newShoutout;

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
              <option>Color</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
            </select>
          </div>
          <textarea
            id="message-body"
            className="input"
            rows="3"
            placeholder="Type a message..."
            name="text"
            value={text}
            onChange={handleInputChange}
            onKeyPress={event => event.key === 'Enter' ? sendShoutout(event) : null}
          />
        </section>
        <section className="canvas-section">
          <button className="sendButton" onClick={sendShoutout}>Send</button>
        </section>
      </div>
  )
}

export default Canvas;
