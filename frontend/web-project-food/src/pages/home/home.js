import React, { useState } from "react";
import EmotionCarousel from "./emotionCarousel";
import "./home.css";
import PlaceCarousel from "./placeCarousel";
import { useNavigate, Link } from "react-router-dom";
import { getStorageItem, removeStorageItem } from "../../utils/useLocalStorage";
import showAlert from "../../utils/alert";
import { useIsLogin } from "../../utils/isLogin";

function Home() {
  const isLogin = useIsLogin();

  const [emotionCarousel, setEmotionCarousel] = useState(false);
  const [placeCarousel, setPlaceCarousel] = useState(true);
  const navigate = useNavigate();

  const [placeSelected, setPlaceSelected] = useState(null);
  const [emotionSelected, setEmotionSelected] = useState(null);

  const selectEmotionFunction = (selected) => {
    setEmotionSelected(selected);
  };
  const selectPlaceFunction = (selected) => {
    setPlaceSelected(selected);
  };
  const showPlace = () => {
    if (emotionSelected !== null) {
      setEmotionCarousel(!emotionCarousel);
      setPlaceCarousel(!placeCarousel);
    } else {
      showAlert({ text: "Please select your emotion!!" });
    }
  };

  const generatePath = (emotionSelected, placeSelected) => {
    // 변수 a와 b의 값을 기반으로 경로 생성
    let path = "/map";

    if (emotionSelected === 1) {
      path += "/happy";
    } else if (emotionSelected === 2) {
      path += "/sad";
    } else if (emotionSelected === 3) {
      path += "/angry";
    } else if (emotionSelected === 4) {
      path += "/love";
    } else if (emotionSelected === 5) {
      path += "/everything";
    }

    if (placeSelected === 1) {
      path += "/Gangnam";
    } else if (placeSelected === 2) {
      path += "/Gwanak";
    } else if (placeSelected === 3) {
      path += "/Mapo";
    } else if (placeSelected === 4) {
      path += "/Seocho";
    } else if (placeSelected === 5) {
      path += "/Seongdong";
    } else if (placeSelected === 6) {
      path += "/Jongno";
    }

    return path;
  };

  const linkToFood = () => {
    if (placeSelected !== null) {
      const path = generatePath(emotionSelected, placeSelected);
      navigate(path);
    } else {
      showAlert({ text: "Please select location!!" });
    }
  };

  return (
    <div className="home">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="275"
        height="112"
        viewBox="0 0 275 112"
        fill="none"
        className="home-login-button"
      >
        <path
          d="M137.5 7C121.735 7 106.124 8.26742 91.5588 10.7299C76.9937 13.1924 63.7595 16.8017 52.6118 21.3518C41.4641 25.9018 32.6213 31.3036 26.5882 37.2485C20.5552 43.1935 17.45 49.5652 17.45 56C17.45 62.4348 20.5552 68.8065 26.5882 74.7515C32.6213 80.6964 41.4641 86.0982 52.6118 90.6482C63.7595 95.1983 76.9937 98.8076 91.5588 101.27C106.124 103.733 121.735 105 137.5 105C169.339 105 199.874 99.8375 222.388 90.6482C244.902 81.4589 257.55 68.9956 257.55 56C257.55 43.0044 244.902 30.541 222.388 21.3518C199.874 12.1625 169.339 7 137.5 7ZM0.299988 56C0.299988 41.1479 14.7549 26.9041 40.4849 16.402C66.2149 5.89998 101.112 0 137.5 0C173.888 0 208.785 5.89998 234.515 16.402C260.245 26.9041 274.7 41.1479 274.7 56C274.7 70.8521 260.245 85.0959 234.515 95.598C208.785 106.1 173.888 112 137.5 112C101.112 112 66.2149 106.1 40.4849 95.598C14.7549 85.0959 0.299988 70.8521 0.299988 56Z"
          fill="black"
        />

        {isLogin === false ? (
          <Link to="/login">
            <text
              x="50%"
              y="50%"
              fontSize="48"
              fontWeight="bold"
              fill="black"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              Login
            </text>
          </Link>
        ) : (
          <text
            x="50%"
            y="50%"
            fontSize="32"
            fontWeight="bold"
            fill="black"
            textAnchor="middle"
            dominantBaseline="middle"
            className="home-id-button"
          >
            Hi, {getStorageItem("username", "user")}!
          </text>
        )}
      </svg>

      <div>
        {isLogin === true ? (
          <div
            className="home-logout-text"
            onClick={() => removeStorageItem("token")}
          >
            Click to log out
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="home-title1-container">
        {emotionCarousel ? (
          <h1 className="home-title1">Which place do you want to search?</h1>
        ) : (
          <h1 className="home-title1">How do you feel today?</h1>
        )}
      </div>
      <div className={`home-carousel ${emotionCarousel ? "emotion" : "place"}`}>
        <EmotionCarousel selected={selectEmotionFunction} />
      </div>

      <div
        className={`home-carousel2 ${emotionCarousel ? "place" : "emotion"}`}
      >
        <PlaceCarousel selected={selectPlaceFunction} />
      </div>

      {!emotionCarousel ? (
        <div className="home-next-button" onClick={showPlace}>
          Next
        </div>
      ) : (
        <div className="home-next-button" onClick={linkToFood}>
          Done
        </div>
      )}
    </div>
  );
}

export default Home;
