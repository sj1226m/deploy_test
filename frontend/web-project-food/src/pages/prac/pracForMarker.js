import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import {
  Map,
  MapMarker,
  Polyline,
  ZoomControl,
  useMap,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import Grid from "./Grid";
import Image from "./Image";
import Icon from "./Icon";
import Text from "./Text";
const EventMarkerContainer = ({ index, content, onClick, isClicked, data }) => {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);
  const [isOver, setIsOver] = useState(false);
  // const [selectedMarker, setSeleteMarker] = useState()
  const markerClick = () => {
    onClick();
    setIsVisible(!isVisible);

    // map.panTo(marker.getPosition());
  };

  // 마커 이미지 hover, click 상황에따라 변경
  let markerImg = isOver
    ? "https://user-images.githubusercontent.com/91959791/169664489-10a08071-905f-4a44-9a14-ae065704ced5.png"
    : "https://user-images.githubusercontent.com/91959791/169664175-5428595a-2e8e-4c76-b738-596aba4f070a.png";

  let markerW = isOver ? 32 : 28;
  let markerH = isOver ? 46 : 40;
  let offsetX = isOver ? 16 : 14;
  let offsetY = isOver ? 46 : 40;

  if (isClicked) {
    markerImg =
      "https://user-images.githubusercontent.com/91959791/169664489-10a08071-905f-4a44-9a14-ae065704ced5.png";
    markerW = 32;
    markerH = 46;
    offsetX = 16;
    offsetY = 46;
  }

  {
    return (
      <React.Fragment>
        <MapMarker
          position={{ lat: content.lat, lng: content.lng }} // 마커를 표시할 위치
          // onClick={(marker) => {markerClick(marker)}}
          onClick={markerClick}
          onMouseOver={() => setIsOver(true)}
          onMouseOut={() => setIsOver(false)}
          image={{
            src: markerImg,
            size: {
              width: markerW,
              height: markerH,
            },
            options: {
              offset: {
                x: offsetX,
                y: offsetY,
              },
            },
          }}
        >
          {/* {isVisible && */}
          {isClicked && isVisible && (
            <CustomOverlayMap
              index={index}
              position={{ lat: content.lat, lng: content.lng }}
              yAnchor={1.5}
              zIndex={1}
            >
              <MymarkerInfo>
                <Grid
                  bg="white"
                  width="auto"
                  height="auto"
                  padding="12px"
                  radius="12px"
                  // _onClick={() => {
                  //   select(content.completedId, index);
                  // }}
                  hover
                  className="container"
                >
                  <Grid height="auto" isFlex className="name-container">
                    <Text margin="0" bold="600" size="14px" className="name">
                      mountain
                    </Text>
                    <Grid
                      width="auto"
                      border="1px solid #43CA3B"
                      radius="4px"
                      padding="1px 4px"
                      className="emotion-container"
                    >
                      <Text
                        margin="0"
                        size="6px"
                        bold="400"
                        color="#43CA3B"
                        className="emotion"
                      >
                        산
                      </Text>
                    </Grid>
                  </Grid>
                  <Grid flexRow alignItems="flex-start" margin="12px 0 0">
                    <Grid
                      flexColumn
                      height="auto"
                      width="auto"
                      alignItems="flex-start"
                      margin="0 18px 0 0"
                    >
                      <Text
                        margin="0 0 4px"
                        size="12px"
                        bold="500"
                        color="#C4C4C4"
                      >
                        in 성동구
                      </Text>
                      <Grid flexRow alignItems="baseline" width="auto">
                        <Text margin="0" size="14px" bold="600" color="#43CA3B">
                          10
                        </Text>
                        <Text margin="0" size="8px" bold="500">
                          km
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid flexColumn height="auto" alignItems="flex-start">
                      <Text
                        margin="0 0 4px"
                        size="12px"
                        bold="500"
                        color="#C4C4C4"
                      >
                        소요 시간
                      </Text>
                    </Grid>
                  </Grid>
                </Grid>
              </MymarkerInfo>
            </CustomOverlayMap>
          )}
        </MapMarker>
      </React.Fragment>
    );
  }
};

const MymarkerInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  // height: auto;
  // overflow: hidden;
  border: none;
  outline: none;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
`;
const MarkerInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  // height: auto;
  // overflow: hidden;
  border: none;
  outline: none;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
`;

export default EventMarkerContainer;
