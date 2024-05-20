import React, { useEffect, useState } from "react";
import { getStorageItem } from "../../utils/useLocalStorage";
import axios from "axios";
import "./tabChildren.css";

function  TabChildren(props) {
  let getUsername = getStorageItem("username", "");
  const [text, setText] = useState("");
  const [placeList, setPlaceList] = useState([]);
  useEffect(() => {
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

  const allFilteredRestaurants = placeList.filter((restaurant) =>
    likedList.includes(restaurant.id)
  );

  const filteredRestaurants = allFilteredRestaurants.filter((item) => {
    return Object.values(item.name).join("").includes(props.searchValue);
  });

  const resultList =
    Object.keys(filteredRestaurants).length === 0
      ? allFilteredRestaurants
      : filteredRestaurants;

  const placeFilteredRestaurants = resultList.filter(
    (place) => place.gu === props.targetGu
  );

  const handleOnClickTitle = (lat, lng) => {
    props.onClickTitle(lat, lng);
  };

  return (
    <div>
      <div className="tabChildren-title"></div>

      {props.targetGu === 0 ? (
        <div>
          {resultList.map((e, index) => (
            <div
              key={index}
              className="tabChildren-name"
              onClick={() => {
                handleOnClickTitle(e.x_coor, e.y_coor);
              }}
            >
              {e.name}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {placeFilteredRestaurants.map((e, index) => (
            <div
              key={index}
              className="tabChildren-name"
              onClick={() => {
                handleOnClickTitle(e.x_coor, e.y_coor);
              }}
            >
              {e.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TabChildren;
