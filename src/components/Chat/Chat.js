import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Canvas from "../Canvas/Canvas";
import Messages from "../Messages/Messages";
import DogHouse from "../DogHouse/DogHouse";
import Header from "../Header/Header";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // const [users, setUsers] = useState('');
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, team } = queryString.parse(location.search);

    const io = require("socket.io-client");
    socket = io(ENDPOINT, {
      extraHeaders: {
        "Access-Control-Allow-Credential": true,
      },
    });

    setName(name);
    setTeam(team);

    socket.emit("join", { name, team }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", (users) => {
      // setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <Header />
        <Messages messages={messages} name={name} />
        <div id="canvasAndDogHouseContainer">
          <Canvas
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
          <DogHouse />
        </div>
      </div>
    </div>
  );
};

export default Chat;
