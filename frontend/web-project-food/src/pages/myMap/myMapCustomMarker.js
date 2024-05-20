import React from "react";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import "./myMapCustomMarker.css";
import { ReloadOutlined } from "@ant-design/icons";
function MyMapCustomMarker({ position, onClick }) {
  return (
    <React.Fragment>
      <MapMarker position={{ lat: position.lat, lng: position.lng }} />

      <CustomOverlayMap
        position={{ lat: position.lat, lng: position.lng }}
        yAnchor={1.5}
        zIndex={1}
      >
        <div className="myMap-customMarker-container">
          <div className="myMap-customMarker-name">Are you Here?</div>
          <div className="myMap-customMarker-sub">If Not? Please Reload</div>
          <ReloadOutlined onClick={onClick} />
        </div>
      </CustomOverlayMap>
    </React.Fragment>
  );
}

export default MyMapCustomMarker;
