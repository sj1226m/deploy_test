import React, { useEffect, useState } from "react";
import "../map/mapSearchBar.css";

const MyMapSearchBar = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
  };

  const handleInputClear = () => {
    setSearchValue("");
  };

  useEffect(() => {
    props.propFunction(searchValue);
  }, [searchValue]);

  return (
    <div className="searchBar">
      <input
        type="text"
        value={searchValue}
        placeholder="식당 이름을 검색하세요"
        onChange={handleInputChange}
      />

      {/*<button*/}
      {/*  onClick={handleInputClear}*/}
      {/*  className="mapSearchBar-clear-button"*/}
      {/*>*/}
      {/*  지우기*/}
      {/*</button>*/}
    </div>
  );
};

export default MyMapSearchBar;
