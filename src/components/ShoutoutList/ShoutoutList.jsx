import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import "./ShoutoutList.css";

import Shoutout from '../Shoutout/Shoutout';

const author = "Perry";
const recipient = "Kent";
const color = "green";
const message = "Curabitur vulputate augue lectus, vel ultricies enim molestie id. Ut blandit laoreet dui a sodales. Sed mi augue, maximus sed turpis id, pretium iaculis dui. Praesent nisi augue, facilisis ac diam quis, convallis luctus eros. Praesent in tincidunt urna. Morbi egestas imperdiet erat vel pharetra. Cras a vulputate nibh."

const comment = {
  commentAuthor: "Frank",
  commentMessage: message
}

const comments = [comment, comment]

const shoutout = {
  author, color, comments, message, recipient, 
}

const shoutouts = [shoutout, shoutout, shoutout]

const ShoutoutList = (
  // { 
  //   shoutouts, 
  //   name 
  // }
  ) => (
  <ScrollToBottom>
    {shoutouts.map((shoutout, i) => (
      <div key={i} className="shoutoutList">
        <Shoutout {...shoutout} />
      </div>
      )
    )}
  </ScrollToBottom>
);

export default ShoutoutList;
