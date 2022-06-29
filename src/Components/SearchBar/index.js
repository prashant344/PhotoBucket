import React, { useState } from "react";
import "./index.css";

const SearchBar = ({ debounceSearch }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="header">
      <input
        className="searchBox"
        placeholder="Search ..."
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          debounceSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
