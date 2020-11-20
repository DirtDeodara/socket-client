import React, { useState } from 'react';
import ReplyInput from '../ReplyInput/ReplyInput';
import "./Shoutout.css";
import commentIcon from "../../icons/comment-icon.svg";
import colorFactory from "./shoutoutColors";

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
  const commentElements = comments.map(({ commentAuthor, commentMessage }, i) => (
    <div className="comment" key={i}>
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
      <div className={`${open ? "commentContainerOpen" : "commentContainerClosed"} shoutoutContainerPadding commentContainer`} style={{ backgroundColor: colorFactory[color].commentBackground }}>
        {commentElements}
        <ReplyInput setMessage={setReply} sendMessage={sendReply} message={reply} buttonColor={colorFactory[color].accent} />
      </div>
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
    <div style={{ margin: "30px 100px -85px" }}>
    <div className={`${commentsOpen ? "flattenedBottomCorners" : "curvedBottomCorners"} shoutoutContainer`} style={{ backgroundColor: colorFactory[color].mainBackground, color: colorFactory[color].text }}>
      <div className="shoutoutContainerPadding">
        <img
          alt="comment"
          src={commentIcon}
          color="white"
          className={`${commentsOpen ? "commentIconOpen" : "commentIconClosed"} commentIcon`}
          onClick={toggleCommentsOpen}
        />
        <h2>Shoutout to <span style={{ color: colorFactory[color].accent }}>{recipient}</span></h2>
        <p>{message}</p>
        <div className="emojiRow">
          {/* TODO onClick and count should come from socket.io? */}
          <Emoji symbol="😂" label="laugh" count={3} onClick={() => { }} />
          <Emoji symbol="❤️" label="love" />
          <Emoji symbol="☝️" label="up" />
        </div>
        <h3 className="author">{author}</h3>
      </div>
    </div>
      <CommentContainer comments={comments} color={color} open={commentsOpen} />
    </div>
  );
}

export default Shoutout;
