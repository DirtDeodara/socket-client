import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');

  return(
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)}/></div>
        <div><input placeholder="Team" className="joinInput mt-20" type="text" onChange={(event) => setTeam(event.target.value)}/></div>
        <Link onClick={(event) => (!name || !team) ? event.preventDefault() : null} to={`/chat?name=${name}&team=${team}`}>
          <button className="btn mt-20" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  )
}

export default Join;
