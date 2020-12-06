import React, { useEffect, useState } from 'react';
import ReplyInput from '../ReplyInput/ReplyInput';
import { socket } from "../../utils/socket"
import commentIcon from "../../icons/comment-icon.svg";
import colorFactory from "./shoutoutColors";
import "./Shoutout.css";

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
  color,
  id,
  open,
}) => {
  const [reply, setReply] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    socket.on('comment', comment => {
      if (id === comment.id) {
        setComments([...comments, comment])
      }
    });
  }, [comments, id])

  const sendReply = (event) => {
    event.preventDefault();
    if (reply) {
      socket.emit('sendReply', { id, text: reply }, () => setReply(''));
    }
  }

  const commentElements = comments.map(({ user: commentAuthor, text: commentMessage }, i) => (
    <div className="comment" key={i}>
      <h3>{commentAuthor}</h3>
      <p>{commentMessage}</p>
    </div>
  ));

  return (
    <div className={`${open ? "commentContainerOpen" : "commentContainerClosed"} shoutoutContainerPadding commentContainer`} style={{ backgroundColor: colorFactory[color].commentBackground }}>
      {commentElements}
      <ReplyInput setMessage={setReply} sendMessage={sendReply} message={reply} buttonColor={colorFactory[color].accent} />
    </div>
  )
};

const Shoutout = ({
  author,
  color,
  id,
  recipient,
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
            {/* TODO incrememnt emoji count on click; send to back end and increase count on front end */}
            <Emoji symbol="😂" label="laugh" count={3} onClick={() => { }} />
            <Emoji symbol="❤️" label="love" />
            <Emoji symbol="☝️" label="up" />
          </div>
          <h3 className="author">{author}</h3>
        </div>
      </div>
      <CommentContainer
        color={color}
        id={id}
        open={commentsOpen}
      />
    </div>
  );
}

export default Shoutout;
