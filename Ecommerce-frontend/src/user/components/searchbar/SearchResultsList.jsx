import React, { useRef } from "react";
import "./SearchResultsList.css";
import "./SearchBar.css";
import { SearchResult } from "./SearchResult";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

export const SearchResultsList = ({ results, setResults }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setResults([]));

  return (
    <div className="results-list" ref={ref}>
      {results.map((result, id) => {
        return <SearchResult result={result.productName} key={id} />;
      })}
    </div>
  );
};
