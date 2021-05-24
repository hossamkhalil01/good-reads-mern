import { useState } from "react";
import { getSearchResult } from "../services/searchService";
import { Link } from "react-router-dom";
const Search = () => {
  const [searchKey, updateSearchKey] = useState("");
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const getFilterdData = async (key) => {
    updateSearchKey(key);
    if (key === "") return;
    const {
      data: {
        data: { matchedAuthors, matchedBooks },
      },
    } = await getSearchResult(key);
    setAuthors(matchedAuthors);
    setBooks(matchedBooks);
  };
  return (
    <>
      <div className="searchBar">
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          value={searchKey}
          onChange={(event) => getFilterdData(event.target.value)}
        />
        <div
          className={`searchResult ${searchKey.length > 0 ? "show" : "hide"}`}
        >
          <div>
            <h4 className="">Matched Authors</h4>
            {authors.length > 0 ? (
              <ul class="list-group list-group-flush">
                {authors.map((author) => (
                  <li key={author._id} class="list-group-item">
                    {author.firstName + author.lastName}
                  </li>
                ))}
              </ul>
            ) : (
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  No Authors Found with this search
                </li>
              </ul>
            )}
          </div>
          <hr />
          <div>
            <h4 className="">Matched Books</h4>
            {books.length > 0 ? (
              <ul class="list-group list-group-flush">
                {books.map((book) => (
                  <li key={book._id} class="list-group-item">
                    {book.title}
                  </li>
                ))}
              </ul>
            ) : (
              <ul class="list-group list-group-flush">
                <li class="list-group-item">No Books Found with this search</li>
              </ul>
            )}
          </div>
          <hr />
          <Link to={`/search/${searchKey}`}>Show More</Link>
        </div>
      </div>
    </>
  );
};

export default Search;
