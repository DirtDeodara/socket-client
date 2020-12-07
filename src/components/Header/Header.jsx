import React, { useState, useEffect } from 'react';
import './Header.css';
import drivewayLogo from '../../icons/driveway-logo.svg';

const Header = () => {
  const [tagLine, setTagLine] = useState("BRING IT HOME") 
  const cycleTagLine = () => {
    const array = ["BRING IT HOME", "HORN GO BEEP", "CAR GO VROOOOM", "DITCH THE DEALERSHIP", "CONVENIENCE DELIVERED", "ME LIKE CARS", "DON'T WANNA CARVANA?"]; 
    setInterval(() => {
      setTagLine(array[Math.floor(Math.random() * 7)]);
    }, 20000)
  }
  useEffect(() => {
    cycleTagLine();
    return () => {
      setTagLine("BRING IT HOME");
    };
  }, []);

  return (
    <div id="headerContainer">
      <img id="drivewayLogo" src={drivewayLogo} alt="driveway logo"/>
      <p id="tagLine">{tagLine}</p>
    </div>
  )
}
export default Header;