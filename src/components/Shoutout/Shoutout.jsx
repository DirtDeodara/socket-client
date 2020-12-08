import React, { useEffect, useState } from 'react';
import ReplyInput from '../ReplyInput/ReplyInput';
import { socket } from "../../utils/socket"
import commentIcon from "../../icons/comment-icon.svg";
import colorFactory from "./shoutoutColors";
import "./Shoutout.css";

const Emoji = ({ id, label, symbol, handleConfetti }) => {
  const [emojiCount, setEmojiCount] = useState(() => {
    const storedCount = localStorage.getItem(`${id}${label}Count`);
    return storedCount !== null
      ? JSON.parse(storedCount)
      : 0
  });
  const [emojiClickEnabled, setEmojiClickEnabled] = useState(true);

  useEffect(() => {
    socket.on('emoji', emoji => {
      if (id === emoji.id && label === emoji.label) {
        setEmojiCount(emoji.count)
      }
    });
  }, [label, id]);

  useEffect(() => {
    localStorage.setItem((`${id}${label}Count`), JSON.stringify(emojiCount));
  }, [emojiCount]);

  const disableEmojiClick = () => {
    setEmojiClickEnabled(false)
  }

  useEffect(() => {
    if(emojiCount > 1) { //We will want to change this to be a better number, but this makes it is easy to test
      handleConfetti();
    }
  }, [emojiCount])

  const onClick = () => {
    socket.emit('incrementEmojiCount', { id, label, count: emojiCount + 1 }, disableEmojiClick);
  }

  return (
  <div className="emojiContainer">
    <span
      className={`emoji ${!emojiClickEnabled && "disabled"}`}
      onClick={emojiClickEnabled && onClick}
      role="img"
      aria-label={label}
      aria-hidden={"false"}
    >
      {symbol}
    </span>
    <span>{emojiCount > 0 && emojiCount}</span>
  </div>
)};

const CommentContainer = ({
  color,
  id,
  open,
}) => {
  const [reply, setReply] = useState("");
  const [comments, setComments] = useState(() => {
    const storedCommentList = localStorage.getItem(`${id}Comments`);

    return storedCommentList !== null
      ? JSON.parse(storedCommentList)
      : []
  });

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

  useEffect(() => {
    localStorage.setItem(`${id}Comments`, JSON.stringify(comments));
  }, [comments]);

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
  handleConfetti
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
            <Emoji id={id} label="laugh" symbol="😂" handleConfetti={handleConfetti}/> {/** currently applied to all emojis, but we could choose to have it one only one or two */}
            <Emoji id={id} label="love" symbol="❤️" handleConfetti={handleConfetti}/>
            <Emoji id={id} label="up" symbol="☝️" handleConfetti={handleConfetti}/>
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
