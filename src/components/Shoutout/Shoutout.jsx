import React, { useState } from 'react';
import Input from '../ReplyInput/ReplyInput';
import "./Shoutout.css";
import commentIcon from "../../icons/comment-icon.svg";

const ENDPOINT = "localhost:5000";
const io = require("socket.io-client");
const socket = io(ENDPOINT, {
  extraHeaders: {
    "Access-Control-Allow-Credential": true,
  },
});

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
    if (reply) {
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
  { 
    author,
    color,
    comments, 
    message,
    recipient
  }
) => {

  const [commentsOpen, setCommentsOpen] = useState(false);

  const toggleCommentsOpen = () => setCommentsOpen(!commentsOpen);

  return (
    <div className={`${color} shoutoutContainer`}>
      <div className="shoutoutContainerPadding">
        <img
          alt="comment"
          src={commentIcon}
          color="white"
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
