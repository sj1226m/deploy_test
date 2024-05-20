import "../map/mapHeader.css";
import React, { useState } from "react";
import { removeStorageItem } from "../../utils/useLocalStorage";
import MyMapSearchBar from "./myMapSearchBar";
import { MenuOutlined } from "@ant-design/icons";

function MyMapHeader({ userName, searchBarFunction, isLogin, clickMap }) {
  const [menuBarActive, setMenuBarActive] = useState(true);
  const onClickMenuBar = () => {
    setMenuBarActive(!menuBarActive);
  };
  return (
    <nav className="header-navbar">
      <div className="header-navbar-name-container">
        <h1 className="header-navbar-userName">{userName} 's Map</h1>
      </div>
      <ul className={`header-navbar-menu ${menuBarActive ? "active" : ""}`}>
        <li>
          <a href="/">Home</a>
        </li>

        {isLogin ? (
          <>
            <li>
              <div style={{ cursor: "pointer" }} onClick={clickMap}>
                Map
              </div>
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
              <a href="#!" onClick={clickMap}>
                Map
              </a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </>
        )}

        <MyMapSearchBar propFunction={searchBarFunction} />
      </ul>
      <MenuOutlined className="header-navbar-button" onClick={onClickMenuBar} />
    </nav>
  );
}

export default MyMapHeader;
