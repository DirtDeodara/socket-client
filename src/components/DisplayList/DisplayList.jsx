import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Shoutout from '../Shoutout/Shoutout';
import AdminMessage from '../AdminMessage/AdminMessage';
import "./DisplayList.css";

const DisplayList = ({ displayList }) => {
  return (
    <ScrollToBottom className="displayList" followButtonClassName="scrollButton">
      {displayList.map((displayItem, i) => {
        return displayItem.type === "message" ? (
          <div key={i} className="displayItem">
            <AdminMessage {...displayItem} />
          </div>
        ) : (
            <div key={i} className="displayItem">
              <Shoutout {...displayItem} />
            </div>
          )
      }
      )}
    </ScrollToBottom>
  )
};

export default DisplayList;
