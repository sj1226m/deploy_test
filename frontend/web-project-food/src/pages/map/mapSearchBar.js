import React, { useEffect, useState } from "react";
import "./mapSearchBar.css";
import axios from "axios";

const MapSearchBar = (props) => {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/place_list/`).then((response) => {
      setAPIData(response.data);
    });
  }, []);

  const [searchValue, setSearchValue] = useState("");

  const [filteredResult, setFilteredResult] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);

    const filteredData = APIData.filter((item) => {
      return (
        item.emotion === props.emotion &&
        item.gu === props.place &&
        Object.values(item.name).join("").includes(inputValue)
      );
    });

    setFilteredResult(filteredData);
  };

  const handleInputClear = () => {
    setSearchValue("");
    setFilteredResult("");
  };

  useEffect(() => {
    props.propFunction(filteredResult);
  }, [filteredResult]);

  return (
    <div className="searchBar">
      <input
        type="text"
        value={searchValue}
        placeholder="식당 이름을 검색하세요"
        onChange={handleInputChange}
        className="searchBar-input"
      />
    </div>
  );
};

export default MapSearchBar;
