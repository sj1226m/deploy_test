import { ZoomControl, Map } from "react-kakao-maps-sdk";
import "./mainMap.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import { getStorageItem } from "../../utils/useLocalStorage";
import ArrChanger from "./arrChanger";
import FoodList from "./foodList";
import { useIsLogin } from "../../utils/isLogin";
import { MapData } from "./mapData";
import MainMapCustomMarker from "./mainMapCustomMarker";
import EmotionIcon from "../../utils/emotionIcon";
import MapHeader from "./mapHeader";

function MainMap() {
  const isLogin = useIsLogin();

  const [hearts, setHearts] = useState([]);

  const { emotion, place } = useParams();
  const placeInfo = MapData[place];
  let getUsername = getStorageItem("username", "");

  const [text, setText] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/place_list")
      .then((response) => {
        setText([...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
    setText(text.filter((text) => text.gu === placeInfo.id));
    console.log(placeInfo.id)

    axios
      .get(`http://127.0.0.1:8000/put_data/${getUsername}`, {
        params: {
          username: getUsername,
        },
      })
      .then((response) => {
        setHearts(ArrChanger(response.data.like_place, text.length));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const filteredData = text.filter((e) => {
    if (emotion === "everything") {
      return e.gu === placeInfo.id; // "everything"인 경우에는 gu 속성만 확인하고, 해당하는 경우만 포함
    } else {
      return e.gu === placeInfo.id && e.emotion === emotion; // 그 외의 경우에는 gu와 emotion 모두 확인
    }
  });

  const heartClick = (index, place) => {
    const updatedHearts = [...hearts];
    updatedHearts[index] = !updatedHearts[index];
    setHearts(updatedHearts);

    axios
      .put(`http://127.0.0.1:8000/put_data/${getUsername}`, {
        username: getUsername,
        like_place: place,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const [center, setCenter] = useState({
    center: { lat: placeInfo.lat, lng: placeInfo.lng },
    isPanto: false,
  });
  const updateCenter = ({ lat, lng }) => {
    setCenter({
      center: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      isPanto: true,
    });
  };

  const modifiedLocations = filteredData.map((location) => ({
    title: location.name,
    latlng: { lat: location.x_coor, lng: location.y_coor },
    linkMap: `https://map.kakao.com/link/map/${location.name},${location.x_coor},${location.y_coor}`,
    linkTo: `https://map.kakao.com/link/to/${location.name},${location.x_coor},${location.y_coor}`,
    mainFood1: location.mainFood1,
    mainFood2: location.mainFood2,
    emotion: location.emotion,
  }));

  const [isOpenStates, setIsOpenStates] = useState(
    Array(filteredData.length).fill(false)
  );
  let [isOpenMenu, setIsOpenMenu] = useState(
    Array(filteredData.length).fill(false)
  );

  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
  };
  const onClickName = (idx, x_coor, y_coor) => {
    const updatedIsOpenMenus = Array(filteredData.length).fill(false);
    updatedIsOpenMenus[idx] = !isOpenMenu[idx];
    setIsOpenMenu(updatedIsOpenMenus);
    setCenter({
      center: { lat: x_coor, lng: y_coor },
      isPanto: true,
    });
  };

  const resultList =
    Object.keys(searchText).length === 0 ? filteredData : searchText;

  const resultHearts = isLogin ? hearts : [];

  return (
    <div>
      <MapHeader
        emotion={emotion}
        gu={placeInfo.name}
        placeId={placeInfo.id}
        searchBarFunction={handleSearch}
        isLogin={isLogin}
      />

      <div className="map-main">
        <Map
          center={{ lat: center.center.lat, lng: center.center.lng }}
          level={3}
          maxLevel={6}
          isPanto={center.isPanto}
          className="map-kakaoMap"
        >
          <ZoomControl />
          {modifiedLocations.map((loc, idx) => (
            <MainMapCustomMarker
              key={`${loc.title}-${loc.latlng}`}
              position={loc.latlng}
              gu={placeInfo.name}
              name={loc.title}
              mainFood1={loc.mainFood1}
              mainFood2={loc.mainFood2}
              emotion={
                <EmotionIcon
                  emotion={loc.emotion}
                  className="customMarker-emotion"
                />
              }
              link={loc.linkTo}
              onClick={() => {
                const updatedIsOpenStates = [...isOpenStates];
                updatedIsOpenStates[idx] = !updatedIsOpenStates[idx];
                setIsOpenStates(updatedIsOpenStates);
                updateCenter(loc.latlng);
              }}
              exitClick={() => {
                const updatedIsOpenStates = [...isOpenStates];
                updatedIsOpenStates[idx] = false;
                setIsOpenStates(updatedIsOpenStates);
              }}
              isClicked={isOpenStates[idx]}
            />
          ))}
        </Map>
        <div className="map-place-list">
          <div className="map-heart-text">Click Heart and Name</div>

          <FoodList
            filteredData={resultList}
            heartClick={heartClick}
            hearts={resultHearts}
            onClickName={onClickName}
            className="map-place-list-antd"
          />
        </div>
      </div>
    </div>
  );
}

export default MainMap;
