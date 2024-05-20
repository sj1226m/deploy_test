import React, { useEffect, useState } from "react";
import { Map, ZoomControl } from "react-kakao-maps-sdk";
import "./myMap.css";
import axios from "axios";
import { getStorageItem } from "../../utils/useLocalStorage";
import { Tabs } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import TabChildren from "./tabChildren";
import MyMapCustomMarker from "./myMapCustomMarker";
import MainMapCustomMarker from "../map/mainMapCustomMarker";
import EmotionIcon from "../../utils/emotionIcon";
import GuList from "../../utils/guList";
import { useIsLogin } from "../../utils/isLogin";
import MyMapHeader from "./myMapHeader";
import { useNavigate } from "react-router-dom";

function MyMap() {
  const isLogin = useIsLogin();
  const navigate = useNavigate();
  const clickMap = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  const [myLoc, setMyLoc] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const [searchText, setSearchText] = useState("");

  let getUsername = getStorageItem("username", "");
  const [text, setText] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const [center, setCenter] = useState([37.5759, 126.9768]);
  const level = 3;
  const onClickTitle = (lat, lng) => {
    setCenter([lat, lng]);
  };

  const items = [
    {
      key: "1",
      label: "전체",
      children: (
        <TabChildren
          targetGu={0}
          onClickTitle={onClickTitle}
          searchValue={searchText}
        />
      ),
    },
    {
      key: "2",
      label: "강남구",
      children: (
        <TabChildren
          targetGu={3}
          onClickTitle={onClickTitle}
          searchValue={searchText}
        />
      ),
    },
    {
      key: "3",
      label: "관악구",
      children: (
        <TabChildren
          targetGu={4}
          onClickTitle={onClickTitle}
          searchValue={searchText}
        />
      ),
    },
    {
      key: "4",
      label: "마포구",
      children: (
        <TabChildren
          targetGu={5}
          onClickTitle={onClickTitle}
          searchValue={searchText}
        />
      ),
    },
    {
      key: "5",
      label: "서초구",
      children: (
        <TabChildren
          targetGu={6}
          onClickTitle={onClickTitle}
          searchValue={searchText}
        />
      ),
    },
    {
      key: "6",
      label: "성동구",
      children: (
        <TabChildren
          targetGu={7}
          onClickTitle={onClickTitle}
          searchValue={searchText}
        />
      ),
    },
    {
      key: "7",
      label: "종로구",
      children: (
        <TabChildren
          targetGu={8}
          onClickTitle={onClickTitle}
          searchValue={searchText}
        />
      ),
    },
  ];
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
          setMyLoc((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },

        (err) => {
          setMyLoc((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setMyLoc((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: true,
      }));
    }
    axios
      .get(`http://127.0.0.1:8000/put_data/${getUsername}`)
      .then((response) => {
        setText(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://127.0.0.1:8000/place_list")
      .then((response) => {
        setPlaceList([...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const likedList = text["like_place"];

  const filteredRestaurants = placeList.filter((restaurant) =>
    likedList.includes(restaurant.id)
  );
  const modifiedLocations = filteredRestaurants.map((location) => ({
    title: location.name,
    latlng: { lat: location.x_coor, lng: location.y_coor },
    mainFood1: location.mainFood1,
    mainFood2: location.mainFood2,
    emotion: location.emotion,
    gu: GuList({ guNum: location.gu }),
    linkTo: `https://map.kakao.com/link/to/${location.name},${location.x_coor},${location.y_coor}`,
  }));

  const [isOpenStates, setIsOpenStates] = useState(
    Array(filteredRestaurants.length).fill(false)
  );
  const handleSearch = (text) => {
    setSearchText(text);
  };
  const onClickReloadButton = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="myMap">
        <MyMapHeader
          userName={getUsername}
          searchBarFunction={handleSearch}
          isLogin={isLogin}
          clickMap={clickMap}
        />

        <div className="myMap-main-container">
          <div>
            {myLoc.isLoading && (
              <div className="myMap-loading-icon-container">
                <LoadingOutlined spin className="myMap-loading-icon" />
              </div>
            )}
            {!myLoc.isLoading && (
              <Map
                center={{ lat: center[0], lng: center[1] }}
                level={level}
                isPanto={true}
                className="myMap-kakao-map"
              >
                <ZoomControl />
                {modifiedLocations.map((loc, idx) => (
                  <MainMapCustomMarker
                    key={`${loc.title}-${loc.latlng}`}
                    position={loc.latlng}
                    name={loc.title}
                    gu={loc.gu}
                    link={loc.linkTo}
                    mainFood1={loc.mainFood1}
                    mainFood2={loc.mainFood2}
                    onClick={() => {
                      const updatedIsOpenStates = [...isOpenStates];
                      updatedIsOpenStates[idx] = !updatedIsOpenStates[idx];
                      setIsOpenStates(updatedIsOpenStates);
                      onClickTitle(loc.latlng.lat, loc.latlng.lng);
                    }}
                    exitClick={() => {
                      const updatedIsOpenStates = [...isOpenStates];
                      updatedIsOpenStates[idx] = false;
                      setIsOpenStates(updatedIsOpenStates);
                    }}
                    isClicked={isOpenStates[idx]}
                    emotion={
                      <EmotionIcon
                        emotion={loc.emotion}
                        className="customMarker-emotion"
                      />
                    }
                  />
                ))}

                {!myLoc.isLoading && (
                  <div>
                    <MyMapCustomMarker
                      position={myLoc.center}
                      onClick={onClickReloadButton}
                    />
                  </div>
                )}
              </Map>
            )}
          </div>
          <div className="myMap-tab-container">
            <div className="myMap-tab-title">Click Name to Move the Map</div>
            <Tabs
              defaultActiveKey="1"
              tabPosition="left"
              size="large"
              style={{
                height: 600,
              }}
              items={items}
              className="myMap-tab"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyMap;
