import React from "react";
import "./SearchResult.css";
import {CiSearch} from 'react-icons/ci';

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      <CiSearch style={{width: '20', height: '20', }}/>
      {result}
    </div>
  );
};