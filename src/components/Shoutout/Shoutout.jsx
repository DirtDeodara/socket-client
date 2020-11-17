import React, { useState } from 'react';
import Input from '../Input/Input';
import "./Shoutout.css";

const ENDPOINT = "localhost:5000";
const io = require("socket.io-client");
const socket = io(ENDPOINT, {
  extraHeaders: {
    "Access-Control-Allow-Credential": true,
  },
});

const author = "Perry";
const recipient = "Kent";
const color = "green";
const message = "Curabitur vulputate augue lectus, vel ultricies enim molestie id. Ut blandit laoreet dui a sodales. Sed mi augue, maximus sed turpis id, pretium iaculis dui. Praesent nisi augue, facilisis ac diam quis, convallis luctus eros. Praesent in tincidunt urna. Morbi egestas imperdiet erat vel pharetra. Cras a vulputate nibh."

const comment = {
  commentAuthor: "Frank",
  commentMessage: message
}

const comments = [comment, comment]

const Emoji = ({ label = "", count, onClick, symbol }) => (
  <div className="emojiContainer">
    <span
      className="emoji"
      onClick={onClick}
      role="img"
      aria-label={label}
      aria-hidden={label ? "false" : "true"}
    >
      {symbol}
    </span>
    <span>{count}</span>
  </div>
);

const CommentContainer = ({
  comments,
  color,
  open
}) => {
  const commentElements = comments.map(({ commentAuthor, commentMessage }) => (
    <div className="comment">
      <h3>{commentAuthor}</h3>
      <p>{commentMessage}</p>
    </div>
  ));
  const [reply, setReply] = useState("")

  const sendReply = (event) => {
    event.preventDefault();
    if (message) {
      // TODO Add sendReply to server; will need a way to connect to comment
      socket.emit('sendReply', reply, () => setReply(''));
    }
  }

  return (
    <>
      {open && (
        <div className={`${color}Comment shoutoutContainerPadding`}>
          {commentElements}
          <Input setMessage={setReply} sendMessage={sendReply} message={reply} />
        </div>
      )}
    </>
  )
};

const Shoutout = (
  // { 
  //   name,
  //   color,
  //   message,
  //   comments 
  //   author
  // }
) => {

  const [commentsOpen, setCommentsOpen] = useState(false);

  const toggleCommentsOpen = () => setCommentsOpen(!commentsOpen);

  return (
    <div className={`${color} shoutoutContainer`}>
      <div className="shoutoutContainerPadding">
        <img
          src="comment-icon.svg"
          className="commentIcon"
          onClick={toggleCommentsOpen}
        />
        <h2>Shoutout to {recipient}</h2>
        <p>{message}</p>
        <div className="emojiRow">
          {/* TODO onClick and count should come from socket.io? */}
          <Emoji symbol="😂" label="laugh" count={3} onClick={() => { }} />
          <Emoji symbol="❤️" label="love" />
          <Emoji symbol="☝️" label="up" />
        </div>
        <h3 className="author">{author}</h3>
      </div>
      <CommentContainer comments={comments} color={color} open={commentsOpen} />
    </div>
  );
}

export default Shoutout;
