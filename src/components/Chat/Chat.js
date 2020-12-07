import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Canvas from "../Canvas/Canvas";
import DogHouse from "../DogHouse/DogHouse";
import Header from "../Header/Header";
import MessageList from "../MessageList/MessageList";
import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [user, setUser] = useState("");
  const emptyShoutout = {
    author: "",
    color: "",
    comments: [],
    recipient: "",
    text: "",
    variant: "shoutout",
  }
  const [newShoutout, setNewShoutout] = useState(emptyShoutout);
  const [messageList, setMessageList] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name } = queryString.parse(location.search);

    const io = require("socket.io-client");
    socket = io(ENDPOINT, {
      extraHeaders: {
        "Access-Control-Allow-Credential": true,
      },
    });

    setUser(name);

    socket.emit("join", { name }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('chatMessage', chatMessage => {
      setMessageList((messageList) => [...messageList, chatMessage]);
    });
  }, []);

  const sendShoutout = (event) => {
    event.preventDefault();
    if (newShoutout) {
      socket.emit("sendShoutout", { ...newShoutout, author: user }, () =>
        setNewShoutout(emptyShoutout)
      );
    }
  };

  return (
    <div className="container">
      <div className="header">
        <Header />
      </div>
      <MessageList messageList={messageList} />
      <div className="bottomSection">
        <div id="canvasAndDogHouseContainer">
          <Canvas
            newShoutout={newShoutout}
            setNewShoutout={setNewShoutout}
            sendShoutout={sendShoutout}
          />
          <DogHouse />
        </div>
      </div>
    </div>
  );
};

export default Chat;
