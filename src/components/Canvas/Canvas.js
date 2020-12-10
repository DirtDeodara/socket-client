import React, { useState } from "react";
import "./Canvas.css";

const Canvas = ({ setNewShoutout, sendShoutout, newShoutout }) => {
  const { recipient, color, message } = newShoutout;
  const errorBaseState = { isError: false, message: "" };
  const [recipientError, setRecipientError] = useState(errorBaseState);
  const [colorError, setColorError] = useState(errorBaseState);
  const [messageError, setMessageError] = useState(errorBaseState);

  const handleInputChange = (e) => {
    setNewShoutout({
      ...newShoutout,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    console.log(color)
    if (!recipient) {
      setRecipientError({
        isError: true,
        message: "Give name to the hero!",
      });
    }
    if (!color || color === "Color") {
      setColorError({ isError: true, message: "Let's make it POP!" });
    }
    if (!message) {
      setMessageError({
        isError: true,
        message: "Don't toy with our hearts. Let the good vibes roll!",
      });
    }

    if (!recipient || !color ||  color === "Color" || !message) {
      return;
    } else {
      setRecipientError(errorBaseState);
      setColorError(errorBaseState);
      setMessageError(errorBaseState);
      sendShoutout(e);
    }
  };

  return (
    <div className="canvas-container">
      <section className="canvas-section" id="msg-form">
        <div className="msg-options">
          <div className="flex-column recipient-input-container">
            <span className="errorMessage" >{recipientError.message}</span>
            <input
              id="recipient-input"
              className="input"
              name="recipient"
              type="text"
              value={recipient}
              placeholder="Shoutout to..."
              onChange={handleInputChange}
              onBlur={() => {
                setRecipientError(
                  !recipient ? {
                    isError: true,
                    message: "Give name to the hero!",
                  } : errorBaseState
                );
              }}
            />
          </div>
          <div className="flex-column color-input-container">
            <span className="errorMessage" >{colorError.message}</span>
            <select
              className="input"
              id="color-input"
              name="color"
              onChange={handleInputChange}
              value={color}
              onBlur={() => {
                setColorError(!color ? {
                  isError: true,
                  message: "Let's make it POP!",
                } : errorBaseState);
              }}
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
        <div className="flex-column">
        <button
          className="sendButton"
          onClick={handleClick}
        >
          Send
        </button>
        </div>
        </div>
        <div className="flex-column">
        <span className="errorMessage" >{messageError.message}</span>
          <textarea
            id="message-body"
            className="input"
            rows="5"
            placeholder="Type a message..."
            name="message"
            value={message}
            onChange={handleInputChange}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendShoutout(event) : null
            }
            onBlur={() => {
              setMessageError(
                !message
                  ? {
                    isError: true,
                    message: "Let everyone know who your praising!",
                  } : errorBaseState
              );
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default Canvas;
