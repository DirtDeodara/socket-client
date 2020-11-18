import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Canvas from "../Canvas/Canvas";
import DogHouse from "../DogHouse/DogHouse";
import Header from "../Header/Header";
import ShoutoutList from "../ShoutoutList/ShoutoutList";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [user, setUser] = useState("");
  const emptyShoutout = { 
    author: "",
    color: "",
    comments: [], 
    message: "",
    recipient: ""
  }
  const [newShoutout, setNewShoutout] = useState(emptyShoutout);
  const [shoutouts, setShoutouts] = useState([]);
  // const [users, setUsers] = useState('');
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
      setShoutouts((shoutouts) => [...shoutouts, newShoutout]);
    });

    socket.on("roomData", (users) => {
      // setUsers(users);
    });
  }, []);

  const sendShoutout = (event) => {
    event.preventDefault();
    if (newShoutout) {
      socket.emit("sendShoutout", { ...newShoutout, author: user }, () => setNewShoutout(emptyShoutout));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <Header />
        <ShoutoutList shoutouts={shoutouts} />
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
    </div>
  );
};

export default Chat;
