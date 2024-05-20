import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import React, { useState } from "react";

const center = {
  // 지도의 중심좌표
  lat: 37.5614,
  lng: 127.0365,
};

export default function BasicMap() {
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  });

  return (
    <>
      <Map // 지도를 표시할 Container
        id="map"
        center={center}
        style={{
          width: "80%",
          height: "80vh",
        }}
        level={3} // 지도의 확대 레벨
        onClick={(_, mouseEvent) => {
          const latlng = mouseEvent.latLng;
          setPosition({
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          });
        }}
      >
        {" "}
        <ZoomControl />
        <MapMarker position={position ?? center} />
      </Map>
      <p>
        <em>지도를 클릭해주세요!</em>
      </p>
      <div id="clickLatlng">
        {position &&
          `클릭한 위치의 위도는 ${position.lat} 이고, 경도는 ${position.lng} 입니다`}
      </div>
    </>
  );
}
