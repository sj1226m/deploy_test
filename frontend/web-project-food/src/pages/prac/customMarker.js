import React from "react";
import {
  Map,
  MapMarker,
  Polyline,
  ZoomControl,
  useMap,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import Grid from "./Grid";
import "./customMarker.css";
import {
  SmileOutlined,
  FrownOutlined,
  MehOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  FaRegSadTear,
  FaRegTired,
  FaRegGrinHearts,
  FaRegUser,
} from "react-icons/fa";
function CustomMarker({ onClick, position, isClicked }) {
  return (
    <React.Fragment>
      <MapMarker
        onClick={onClick}
        position={{ lat: position.lat, lng: position.lng }}
      >
        {isClicked && (
          <CustomOverlayMap
            position={{ lat: position.lat, lng: position.lng }}
            yAnchor={1.5}
            zIndex={1}
          >
            <div className="customMarker-container">
              <div className="customMarker-name-container">
                <h1 className="customMarker-name">팔각도</h1>

                <div className="customMarker-gu-container">
                  <h1 className="customMarker-gu">성동구</h1>
                </div>
              </div>

              <div className="customMarker-bottom-container">
                <div className="custoMarker-bottom-left-container">
                  <div className="customMarker-mainFood">대표음식</div>
                  <div className="customMarker-emotion-container">
                    <SmileOutlined className="customMarker-emotion" />
                  </div>
                </div>
                <div className="customMarker-food-container">
                  <div className="customMarker-food">닭구이</div>
                  <div className="customMarker-food">연골구이</div>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </MapMarker>
    </React.Fragment>
  );
}

export default CustomMarker;
