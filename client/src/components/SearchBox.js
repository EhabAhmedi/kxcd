import React, { useState } from "react";
import "../App.css";

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
      setSearchTerm("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        className="search-input search-comic"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter comic ID"
        autocomplete="off"
      />
      <button className="search-button " type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
