import React, { useState } from "react";
import "./buttonForCarousel.css";
function ButtonForCarousel({ icon, parentClassName }) {
  const iconStyle = {
    fontSize: "64px", // 원하는 크기로 설정
    color: "black",
  };
  return (
    <div
      className={`circle-button ${
        parentClassName === "button-carousel active" ? "click" : ""
      }`}
      style={iconStyle}
    >
      {icon}
    </div>
  );
}

export default ButtonForCarousel;
