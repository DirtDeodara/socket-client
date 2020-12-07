import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { v4 as uuidv4 } from 'uuid';
import Canvas from "../Canvas/Canvas";
import DogHouse from "../DogHouse/DogHouse";
import Header from "../Header/Header";
import MessageList from "../MessageList/MessageList";
import { socket } from "../../utils/socket"
import "./Chat.css";

const Chat = ({ location }) => {
  const [user, setUser] = useState("");
  const emptyShoutout = {
    author: "",
    color: "",
    id: "",
    recipient: "",
    text: "",
    variant: "shoutout",
  }
  const [newShoutout, setNewShoutout] = useState(emptyShoutout);
  const [messageList, setMessageList] = useState(() => {
    const storedMessageList = localStorage.getItem('storedMessages')

    return storedMessageList !== null
      ? JSON.parse(storedMessageList)
      : []
  });

  useEffect(() => {
    const { name } = queryString.parse(location.search);

    setUser(name);

    socket.emit("join", { name }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [location.search]);

  useEffect(() => {
    socket.on("shoutout", (newShoutout) => {
      setMessageList((messageList) => [...messageList, newShoutout]);
    });

    socket.on('chatMessage', chatMessage => {
      setMessageList((messageList) => [...messageList, chatMessage]);
      localStorage.setItem('messages', messageList);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('storedMessages', JSON.stringify(messageList));
  }, [messageList]);

  const sendShoutout = (event) => {
    event.preventDefault();
    if (newShoutout) {
      socket.emit("sendShoutout", {
        ...newShoutout,
        author: user,
        id: uuidv4()
      }, () => setNewShoutout(emptyShoutout));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <Header />
        <MessageList messageList={messageList} />
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
    </div>
  );
};

export default Chat;