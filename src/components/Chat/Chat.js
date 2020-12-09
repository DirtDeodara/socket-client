import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { v4 as uuidv4 } from "uuid";
import Canvas from "../Canvas/Canvas";
import DogHouse from "../DogHouse/DogHouse";
import Header from "../Header/Header";
import MessageList from "../MessageList/MessageList";
import Confetti from "react-confetti";
import { socket } from "../../utils/socket";
import { users } from "../../utils/passcodes";
import "./Chat.css";
import { useLocation } from "react-router";

const Chat = () => {
  const [user, setUser] = useState("");
  const emptyShoutout = {
    author: "",
    color: "",
    id: "",
    recipient: "",
    text: "",
    variant: "shoutout",
  };

  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");

  const [shouldDropConfetti, setShouldDropConfetti] = useState(false);

  const height = window.innerHeight;
  const width = window.innerWidth;

  const toggleConfetti = () => {
    setShouldDropConfetti(true);
    setTimeout(() => {
      setShouldDropConfetti(false);
    }, 5000); //this time can be adjusted, but it seems about right to account for the confetti "falling off the screen"
  };

  const [newShoutout, setNewShoutout] = useState(emptyShoutout);
  const [messageList, setMessageList] = useState(() => {
    const storedMessageList = localStorage.getItem("storedMessages");

    return storedMessageList !== null ? JSON.parse(storedMessageList) : [];
  });

  useEffect(() => {
    const user =  users.find(user => user.code === code);

    setUser(user.name);

    socket.emit("join", user, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("shoutout", (newShoutout) => {
      setMessageList((messageList) => [...messageList, newShoutout]);
    });

    socket.on("chatMessage", (chatMessage) => {
      setMessageList((messageList) => [...messageList, chatMessage]);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("storedMessages", JSON.stringify(messageList));
  }, [messageList]);

  const sendShoutout = (event) => {
    event.preventDefault();
    if (newShoutout) {
      socket.emit(
        "sendShoutout",
        {
          ...newShoutout,
          author: user,
          id: uuidv4(),
        },
        () => setNewShoutout(emptyShoutout)
      );
    }
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: window.scrollY,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {shouldDropConfetti && (
          <Confetti
            run={shouldDropConfetti}
            gravity={0.2}
            numberOfPieces={2000}
            width={width}
            height={height}
            recycle={false}
          />
        )}
      </div>
      <div className="container">
        <Header />
        <MessageList
          messageList={messageList}
          handleConfetti={toggleConfetti}
        />
        <div className="bottomSection">
          <div id="canvasAndDogHouseContainer">
            <Canvas
              newShoutout={newShoutout}
              sendShoutout={sendShoutout}
              setNewShoutout={setNewShoutout}
            />
            <DogHouse />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
