import React from "react";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import "./mainMapCustomMarker.css";

function MainMapCustomMarker({
  onClick,
  exitClick,
  position,
  isClicked,
  gu,
  name,
  mainFood1,
  mainFood2,
  emotion,
  link,
}) {
  const onClickLink = () => {
    window.open(link, "_blank");
  };
  const textLength = name.length;

  return (
    <React.Fragment>
      <MapMarker
        onClick={onClick}
        position={{ lat: position.lat, lng: position.lng }}
      ></MapMarker>
      {isClicked && (
        <CustomOverlayMap
          position={{ lat: position.lat, lng: position.lng }}
          yAnchor={1.5}
          zIndex={1}
        >
          <div className="customMarker-container">
            <div className="customMarker-name-container">
              <h1
                className={`customMarker-name ${textLength > 7 ? "long" : ""}`}
              >
                {name}
              </h1>
              <div className="customMarker-top-container">
                <div className="customMarker-btn-container">
                  <button
                    className="customMarker-kakao-button"
                    onClick={onClickLink}
                  >
                    <span className="customMarker-kakao-icon">-</span>
                  </button>
                  <button
                    className="customMarker-close-button"
                    onClick={exitClick}
                  >
                    <span className="customMarker-close-icon">&times;</span>
                  </button>
                </div>
                <div className="customMarker-gu-container">
                  <h1 className="customMarker-gu">{gu}구</h1>
                </div>
              </div>
            </div>

            <div className="customMarker-bottom-container">
              <div className="custoMarker-bottom-left-container">
                <div className="customMarker-mainFood">대표음식</div>
                <div className="customMarker-food-container">
                  <div className="customMarker-food">{mainFood1}</div>
                  <div className="customMarker-food">{mainFood2}</div>
                </div>
              </div>
              <div className="customMarker-emotion">{emotion}</div>
            </div>
          </div>
        </CustomOverlayMap>
      )}
    </React.Fragment>
  );
}

export default MainMapCustomMarker;
