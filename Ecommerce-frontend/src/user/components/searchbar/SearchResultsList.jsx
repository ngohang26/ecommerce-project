import React from "react";
import "./SearchResultsList.css";
import "./SearchBar.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result.productName} key={id} />;
      })}
    </div>
  );
};
