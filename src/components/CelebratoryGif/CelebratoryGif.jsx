import React from "react";
import Lottie from "react-lottie";
import bouncyCar from "./bouncy-car.json";
import rainbow from "./clickable-rainbow.json";
import fireworks from "./fireworks.json";
import moped from "./moped.json";
import "./CelebratoryGif.css";

const carGifs = [
  bouncyCar,
  rainbow,
  fireworks,
  moped
]

const CelebratoryGif = () => {
  const randomNumber = Math.floor(Math.random() * carGifs.length);
  const animationData = carGifs[randomNumber];
  const lottieOptions = {
    animationData,
  };

  return (
    <div className="gif-container">
      <Lottie
        options={lottieOptions}
        isClickToPauseDisabled={true}
        width="70%"
      />
      <h1 className="gif-text">You got kudos!</h1>
    </div>
  );
};

export default CelebratoryGif;
