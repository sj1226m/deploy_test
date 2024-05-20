import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import React, { useEffect, useState } from "react";

import "./placeCarousel.css";

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
const PlaceCarousel = ({ selected }) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 3000,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  function ButtonForCarousel({ icon, onClick, className }) {
    const iconStyle = {
      fontSize: "72px", // 원하는 크기로 설정
      color: "black",
    };
    return (
      <>
        <div style={iconStyle} onClick={onClick} className={className}>
          {icon}
        </div>
      </>
    );
  }
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (idx) => {
    setActiveButton(idx);
  };

  useEffect(() => {
    selected(activeButton);
  }, [activeButton]);
  // selected(activeButton);
  return (
    <div>
      <Slider {...settings}>
        <div className="button-carousel">
          <ButtonForCarousel
            icon={<img src="/img/강남구.svg" alt="Example" className="logo" />}
            onClick={() => handleButtonClick(1)}
            className={`circle-button2 ${activeButton === 1 ? "active" : ""}`}
          />
          <h1
            className={`button-carousel-text${
              activeButton === 1 ? "active" : ""
            }`}
          >
            강남구
          </h1>
        </div>
        <div className="button-carousel">
          <ButtonForCarousel
            icon={<img src="/img/관악구.svg" alt="Example" className="logo" />}
            onClick={() => handleButtonClick(2)}
            className={`circle-button2 ${activeButton === 2 ? "active" : ""}`}
          />
          <h1
            className={`button-carousel-text${
              activeButton === 2 ? "active" : ""
            }`}
          >
            관악구
          </h1>
        </div>
        <div className="button-carousel">
          <ButtonForCarousel
            icon={<img src="/img/마포구.svg" alt="Example" className="logo" />}
            onClick={() => handleButtonClick(3)}
            className={`circle-button2 ${activeButton === 3 ? "active" : ""}`}
          />
          <h1
            className={`button-carousel-text${
              activeButton === 3 ? "active" : ""
            }`}
          >
            마포구
          </h1>
        </div>
        <div className="button-carousel">
          <ButtonForCarousel
            icon={<img src="/img/서초구.svg" alt="Example" className="logo" />}
            onClick={() => handleButtonClick(4)}
            className={`circle-button2 ${activeButton === 4 ? "active" : ""}`}
          />
          <h1
            className={`button-carousel-text${
              activeButton === 4 ? "active" : ""
            }`}
          >
            서초구
          </h1>
        </div>
        <div className="button-carousel">
          <ButtonForCarousel
            icon={<img src="/img/성동구.svg" alt="Example" className="logo" />}
            onClick={() => handleButtonClick(5)}
            className={`circle-button2 ${activeButton === 5 ? "active" : ""}`}
          />
          <h1
            className={`button-carousel-text${
              activeButton === 5 ? "active" : ""
            }`}
          >
            성동구
          </h1>
        </div>
        <div className="button-carousel">
          <ButtonForCarousel
            icon={<img src="/img/종로구.svg" alt="Example" className="logo" />}
            onClick={() => handleButtonClick(6)}
            className={`circle-button2 ${activeButton === 6 ? "active" : ""}`}
          />
          <h1
            className={`button-carousel-text${
              activeButton === 6 ? "active" : ""
            }`}
          >
            종로구
          </h1>
        </div>
      </Slider>
    </div>
  );
};

export default PlaceCarousel;
