import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import "./emotionCarousel.css";
import "./buttonForCarousel.css";
import { SmileOutlined, FrownOutlined, MehOutlined } from "@ant-design/icons";
import {
  FaRegSadTear,
  FaRegTired,
  FaRegGrinHearts,
  FaRegUser,
} from "react-icons/fa";

const EmotionCarousel = ({ selected }) => {
  const [activeButton, setActiveButton] = useState(null);

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
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  function ButtonForCarousel({ icon: IconComponent, onClick, className }) {
    const iconStyle = {
      fontSize: "72px", // 원하는 크기로 설정
      color: "black",
    };
    return (
      <IconComponent
        style={iconStyle}
        onClick={onClick}
        className={className}
      />
    );
  }

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
            icon={SmileOutlined}
            onClick={() => handleButtonClick(1)}
            className={`circle-button ${activeButton === 1 ? "active" : ""}`}
          />
          <div className="button-carousel-text">happy</div>
        </div>
        <div className="button-carousel">
          <ButtonForCarousel
            icon={FaRegSadTear}
            onClick={() => handleButtonClick(2)}
            className={`circle-button ${activeButton === 2 ? "active" : ""}`}
          />
          <div className="button-carousel-text">sad</div>
        </div>
        <div className="button-carousel">
          <ButtonForCarousel
            icon={FrownOutlined}
            onClick={() => handleButtonClick(3)}
            className={`circle-button ${activeButton === 3 ? "active" : ""}`}
          />
          <div className="button-carousel-text">angry</div>
        </div>
        <div className="button-carousel">
          <ButtonForCarousel
            icon={FaRegGrinHearts}
            onClick={() => handleButtonClick(4)}
            className={`circle-button ${activeButton === 4 ? "active" : ""}`}
          />
          <div className="button-carousel-text">love</div>
        </div>
        <div className="button-carousel">
          <ButtonForCarousel
            icon={FaRegUser}
            onClick={() => handleButtonClick(5)}
            className={`circle-button ${activeButton === 5 ? "active" : ""}`}
          />
          <div className="button-carousel-text">everything</div>
        </div>
      </Slider>
    </div>
  );
};

export default EmotionCarousel;
