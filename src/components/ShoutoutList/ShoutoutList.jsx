import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Shoutout from '../Shoutout/Shoutout';
import "./ShoutoutList.css";

const ShoutoutList = ({ shoutouts }) => (
  <ScrollToBottom className="shoutoutList">
    {shoutouts.map((shoutout, i) => (
      <div key={i} className="shoutoutItem">
        <Shoutout {...shoutout} />
      </div>
      )
    )}
  </ScrollToBottom>
);

export default ShoutoutList;
