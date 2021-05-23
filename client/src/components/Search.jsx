import { useState } from "react";
const Search = () => {
  const [searchKey, updateSearchKey] = useState("");
  return (
    <>
      <div className="searchBar">
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          value={searchKey}
          onChange={(event) => updateSearchKey(event.target.value)}
        />
        <div className={`searchResult ${searchKey.length > 0 ? "show" : ""}`}>
          <h2 className="text-center bg-info">search result</h2>
        </div>
      </div>
    </>
  );
};

export default Search;
