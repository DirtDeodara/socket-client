import React, { useState, useEffect } from 'react';
import './Header.css';
import drivewayLogo from '../../icons/driveway-logo.svg';

const Header = () => {
  const [tagLine, setTagLine] = useState("BRING IT HOME") 
  const cycleTagLine = () => {
    const array = ["BRING IT HOME", "HORN GO BEEP", "CAR GO VROOOOM", "DITCH THE DEALERSHIP", "CONVENIENCE DELIVERED", "ME LIKE CARS"]; 
    setInterval(() => {
      setTagLine(array[Math.floor(Math.random() * 5)]);
    }, 20000)
  }
  useEffect(() => {
    cycleTagLine();
  }, []);

  return (
    <div id="headerContainer">
      <img id="drivewayLogo" src={drivewayLogo} alt="driveway logo"/>
      <p id="tagLine">{tagLine}</p>
    </div>
  )
}
export default Header;