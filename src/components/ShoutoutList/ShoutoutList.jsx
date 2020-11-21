import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Shoutout from '../Shoutout/Shoutout';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import "./ShoutoutList.css";

const ShoutoutList = ({ shoutouts, welcomeMessage }) => {
  return (
  <ScrollToBottom className="shoutoutList" followButtonClassName="scrollButton">
    <WelcomeMessage {...welcomeMessage} />
    {/* Could have "message" and "shoutout" type, and could render appropriate component accordingly */}
    {shoutouts.map((shoutout, i) => (
      <div key={i} className="shoutoutItem">
        <Shoutout {...shoutout} />
      </div>
      )
    )}
  </ScrollToBottom>
)};

export default ShoutoutList;
