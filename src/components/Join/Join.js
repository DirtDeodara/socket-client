import React, { useState } from 'react';
import './Join.css';
import { users } from "../../utils/passcodes";
import { useHistory } from "react-router-dom";


const Join = () => {
  // const [name, setName] = useState('');
  const [passcode, setPasscode] = useState('');
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    const validUser = users.find(user => user.code === passcode);
    console.log(validUser);
    if (validUser) {
      history.push(`/chat?code=${passcode}`)
    }
  }

  return(
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <form onSubmit={handleLogin}>
          <input placeholder="Passcode" className="joinInput" type="text" onChange={(event) => setPasscode(event.target.value)} />
          <button className="btn mt-20" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default Join;
