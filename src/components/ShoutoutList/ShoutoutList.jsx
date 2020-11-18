import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Shoutout from '../Shoutout/Shoutout';
import "./ShoutoutList.css";

const ShoutoutList = ({ shoutouts }) => (
  <ScrollToBottom className="scrollContainer">
    {shoutouts.map((shoutout, i) => (
      <div key={i} className="shoutoutList">
        <Shoutout {...shoutout} />
      </div>
      )
    )}
  </ScrollToBottom>
);

export default ShoutoutList;
