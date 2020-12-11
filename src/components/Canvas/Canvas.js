import React, { useState } from "react";
import { users } from "../../utils/passcodes";
import "./Canvas.css";

const Canvas = ({ setNewShoutout, sendShoutout, newShoutout }) => {
  const { recipient, color, text } = newShoutout;
  const errorBaseState = { isError: false, message: "" };
  const [recipientError, setRecipientError] = useState(errorBaseState);
  const [colorError, setColorError] = useState(errorBaseState);
  const [messageError, setMessageError] = useState(errorBaseState);
  const [hideRecipientInput, setHideRecipientInput] = useState(false);

  const handleInputChange = (e) => {
    setNewShoutout({
      ...newShoutout,
      [e.target.name]: e.target.value,
    });

    if (e.target.id === "recipient-select" && e.target.value !== "Select Teammate") {
      setHideRecipientInput(true);
    }

    if (e.target.id === "recipient-select" && e.target.value === "Select Teammate") {
      setHideRecipientInput(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!recipient || recipient === "Select Teammate") {
      setRecipientError({
        isError: true,
        message: "Give name to the hero!",
      });
    }
    if (!color || color === "Color") {
      setColorError({ isError: true, message: "Let's make it POP!" });
    }
    if (!text) {
      setMessageError({
        isError: true,
        message: "Don't toy with our hearts. Let the good vibes roll!",
      });
    }

    if (!recipient || recipient === "Select Teammate" || !color || color === "Color" || !text) {
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
      <form className="canvas-section" id="msg-form" onSubmit={handleSubmit}>
        <div className="msg-options">
          <div className="flex-column recipient-input-container">
            <span className="errorMessage">{recipientError.message}</span>
            <div>
              <select
                id="recipient-select"
                className="input"
                name="recipient"
                value={recipient}
                onChange={handleInputChange}
                onBlur={() => {
                  setRecipientError(
                    !recipient ? {
                      isError: true,
                      message: "Give name to the hero!",
                    } : errorBaseState
                  );
                }}
              >
                <option>Select Teammate</option>
                {users.map((user, i) => <option value={user.name} key={i}>{user.name}</option>)}
              </select>
              {!hideRecipientInput && <p>or</p>}
              {!hideRecipientInput && <input
                id="recipient-input"
                className="input"
                name="recipient"
                type="text"
                value={recipient === "Select Teammate" ? null : recipient}
                placeholder="Enter recipients"
                onChange={handleInputChange}
                onBlur={() => {
                  setRecipientError(
                    !recipient ? {
                      isError: true,
                      message: "Give name to the hero!",
                    } : errorBaseState
                  );
                }}
              />}
            </div>
          </div>

          <div className="flex-column color-input-container">
            <span className="errorMessage">{colorError.message}</span>
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
            >
              Send
        </button>
          </div>
        </div>
        <div className="flex-column">
          <span className="errorMessage">{messageError.message}</span>
          <textarea
            id="message-body"
            className="input"
            rows="4"
            placeholder="Type a message celebrating the awesomeness of your team members..."
            name="text"
            value={text}
            onChange={handleInputChange}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendShoutout(event) : null
            }
            onBlur={() => {
              setMessageError(
                !text
                  ? {
                    isError: true,
                    message: "Don't toy with our hearts. Let the good vibes roll!",
                  } : errorBaseState
              );
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Canvas;
