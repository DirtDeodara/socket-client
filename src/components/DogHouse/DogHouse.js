import React, { useState } from "react";
import doghouse from "../../icons/doghouse.png";
import dogArray from "../../dogs/dogsArray";
import "./DogHouse.css";

const DogHouse = () => {
  const [image, setImage] = useState();
  const [showBtn, setShowBtn] = useState(false);
  const [showImage, setShowImage] = useState(true);
  console.log(image);
  const showDog = () => {
    setImage(dogArray[Math.floor(Math.random() * 49)])
    setShowBtn(true);
    setShowImage(false);
    setTimeout(() => {
      setShowBtn(false);
      setShowImage(true);
    }, 4000);
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
