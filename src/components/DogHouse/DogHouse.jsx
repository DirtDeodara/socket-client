import React, { useState } from "react";
import doghouse from "../../icons/doghouse.png";
import dogArray from "../../dogs/dogsArray";
import "./DogHouse.css";

const DogHouse = () => {
  const [image, setImage] = useState();
  const [showBtn, setShowBtn] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [previouslyDisplayed, setPreviouslyDisplayed] = useState([]);
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 60));

  const showDog = () => {
    setRandomNumber(Math.floor(Math.random() * 60));
    if(previouslyDisplayed.length < 60) {
      if(previouslyDisplayed.includes(randomNumber)) {
        setRandomNumber(Math.floor(Math.random() * 60));
      }
      setPreviouslyDisplayed([...previouslyDisplayed, randomNumber]);
    } else {
      setPreviouslyDisplayed([randomNumber]);
    }

    setImage(dogArray[randomNumber]);
    setShowBtn(true);
    setShowImage(false);
    setTimeout(() => {
      setShowBtn(false);
      setShowImage(true);
    }, 3000);
  };

  return (
    <div id="dogHouseContainer">
      <button id="dogHouseBtn" onClick={showDog}>
        <img id="dogHouse" src={doghouse} alt="dog house" hidden={showBtn} />
      </button>
      <img
        id="dogImage"
        src={image}
        alt="some super cute dog"
        hidden={showImage}
      />
    </div>
  );
};
export default DogHouse;
