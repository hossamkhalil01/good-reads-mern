import { useState } from "react";
import { getSearchResult } from "../services/searchService";
const Search = () => {
  const [searchKey, updateSearchKey] = useState("");
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const getFilterdData = async (key) => {
    updateSearchKey(key);
    if (key === "") return;
    const {
      data: {
        data: { matchedAuthors, matchedBooks, matchedCategories },
      },
    } = await getSearchResult(key);
    setAuthors(matchedAuthors);
    setBooks(matchedBooks);
    setCategories(matchedCategories);
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
          <div>
            <h4 className="">Matched Categories</h4>
            {categories.length > 0 ? (
              <ul class="list-group list-group-flush">
                {categories.map((category) => (
                  <li key={category._id} class="list-group-item">
                    {category.label}
                  </li>
                ))}
              </ul>
            ) : (
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  No Categories Found with this search
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
