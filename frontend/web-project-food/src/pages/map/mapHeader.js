import "./mapHeader.css";
import React, { useState } from "react";
import EmotionIcon from "../../utils/emotionIcon";
import showAlert from "../../utils/alert";
import { removeStorageItem } from "../../utils/useLocalStorage";
import MapSearchBar from "./mapSearchBar";
import { MenuOutlined } from "@ant-design/icons";

function MapHeader({ emotion, gu, placeId, searchBarFunction, isLogin }) {
  const [menuBarActive, setMenuBarActive] = useState(true);
  const onClickMenuBar = () => {
    setMenuBarActive(!menuBarActive);
  };
  return (
    <nav className="header-navbar">
      <div className="header-navbar-name-container">
        <EmotionIcon className="header-navbar-icon" emotion={emotion} />
        <h1 className="header-navbar-name">{gu}구</h1>
      </div>
      <ul className={`header-navbar-menu ${menuBarActive ? "active" : ""}`}>
        <li>
          <a href="/">Home</a>
        </li>

        {isLogin ? (
          <>
            <li>
              <a href="/myMap">MyMap</a>
            </li>
            <li>
              <a href="#!" onClick={() => removeStorageItem("token")}>
                Logout
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a
                href="#!"
                onClick={() =>
                  showAlert({
                    text: "If you want to use MyMap, LOGIN first!",
                    footer: "Go to login page",
                    link: "/login",
                  })
                }
              >
                MyMap
              </a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </>
        )}

        <MapSearchBar
          emotion={emotion}
          place={placeId}
          propFunction={searchBarFunction}
        />
      </ul>
      <MenuOutlined className="header-navbar-button" onClick={onClickMenuBar} />
    </nav>
  );
}

export default MapHeader;
