import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { v4 as uuidv4 } from 'uuid';
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
    id: "",
    recipient: "",
    text: "",
    variant: "shoutout",
  }
  const [newShoutout, setNewShoutout] = useState(emptyShoutout);
  const [messageList, setMessageList] = useState([]);
  const [reply, setReply] = useState("");
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
    socket.on("shoutout", (newShoutout) => {
      setMessageList((messageList) => [...messageList, newShoutout]);
    });

    socket.on('chatMessage', chatMessage => {
      setMessageList((messageList) => [...messageList, chatMessage]);
    });

    // socket.on('comment', comment => {
    //   // find shoutoutId in messageList and add comment to appropriate shoutout
    //   console.log(comment)
    //   console.log(messageList)
    //   messageList.find(shoutout => shoutout.id === comment.shoutoutId)
    //     .then(selectedShoutout => {
    //       console.log(selectedShoutout);
    //       return setMessageList(...messageList, {...selectedShoutout, comments: { ...selectedShoutout.comments, comment }})})
    // });
  }, []);

  useEffect(() => {
    socket.on('comment', comment => {
      // find shoutoutId in messageList and add comment to appropriate shoutout
      console.log(comment)
      console.log(messageList)
      messageList.find(shoutout => shoutout.id === comment.shoutoutId)
        .then(selectedShoutout => {
          console.log(selectedShoutout);
          return setMessageList(...messageList, {...selectedShoutout, comments: { ...selectedShoutout.comments, comment }})})
    });
  }, [messageList])
  console.log(messageList)
  
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

  const sendReply = (event, shoutoutId) => {
    event.preventDefault();
    if (reply) {
      socket.emit('sendReply', { shoutoutId, text: reply}, () => setReply(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <Header />
        <MessageList
          messageList={messageList}
          reply={reply}
          sendReply={sendReply}
          setReply={setReply}
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
    </div>
  );
};

export default Chat;
