import React, { useState } from 'react';
import ReplyInput from '../ReplyInput/ReplyInput';
import commentIcon from "../../icons/comment-icon.svg";
import colorFactory from "./shoutoutColors";
import "./Shoutout.css";

// const ENDPOINT = "localhost:5000";
// const io = require("socket.io-client");
// const socket = io(ENDPOINT, {
//   extraHeaders: {
//     "Access-Control-Allow-Credential": true,
//   },
// });

const Emoji = ({ count, label = "", onClick, symbol }) => (
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
  id,
  open,
  reply,
  sendReply,
  setReply
}) => {
  const commentElements = comments.map(({ commentAuthor, commentMessage }, i) => (
    <div className="comment" key={i}>
      <h3>{commentAuthor}</h3>
      <p>{commentMessage}</p>
    </div>
  ));

  return (
    <div className={`${open ? "commentContainerOpen" : "commentContainerClosed"} shoutoutContainerPadding commentContainer`} style={{ backgroundColor: colorFactory[color].commentBackground }}>
      {commentElements}
      <ReplyInput setMessage={setReply} sendMessage={(e) => sendReply(e, id)} message={reply} buttonColor={colorFactory[color].accent} />
    </div>
  )
};

const Shoutout = ({
    author,
    color,
    comments,
    id,
    recipient,
    reply,
    sendReply,
    setReply,
    text,
  }) => {

  const [commentsOpen, setCommentsOpen] = useState(false);

  const toggleCommentsOpen = () => setCommentsOpen(!commentsOpen);

  return (
    <div className="shoutoutOuterContainer">
      <div
        className={`${commentsOpen ? "flattenedBottomCorners" : "curvedBottomCorners"} shoutoutContainer`} style={{ backgroundColor: colorFactory[color].mainBackground, color: colorFactory[color].text }}>
        <div className="shoutoutContainerPadding">
          <img
            alt="comment"
            className={`${commentsOpen ? "commentIconOpen" : "commentIconClosed"} commentIcon`}
            color="white"
            onClick={toggleCommentsOpen}
            src={commentIcon}
          />
          <h2>Shoutout to <span style={{ color: colorFactory[color].accent }}>{recipient}</span></h2>
          <p>{text}</p>
          <div className="emojiRow">
            {/* TODO onClick and count should come from socket.io? */}
            <Emoji symbol="😂" label="laugh" count={3} onClick={() => { }} />
            <Emoji symbol="❤️" label="love" />
            <Emoji symbol="☝️" label="up" />
          </div>
          <h3 className="author">{author}</h3>
        </div>
      </div>
      <CommentContainer
        color={color}
        comments={comments}
        id={id}
        open={commentsOpen}
        reply={reply}
        sendReply={sendReply}
        setReply={setReply} 
      />
    </div>
  );
}

export default Shoutout;
