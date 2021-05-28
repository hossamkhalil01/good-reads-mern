import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Paginator from "../components/Paginator";
import { getAuthors } from "../services/authorsService";
import { getBooks } from "../services/booksService";
import {
  createPaginationParams,
  parsePaginatedResponse
} from "../utils/pagination";

export const SearchResult = () => {
  const { key } = useParams();
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [authorsPagination, setAuthorsPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  const [booksPagination, setBooksPagination] = useState({
    page: 1,
    totalPages: 1,
  });
  useEffect(() => {
    handleAuthorsPageChange();
    handleBooksPageChange();
  }, [key]);

  const getFilterdBooks = async (key) => {
    const {
      data: {
        data: { docs },
      },
    } = await getBooks({ key });
    setBooks(docs);
  };

  const handleAuthorsPageChange = async (newPage) => {
    // construct the params
    const params = createPaginationParams(
      { key },
      { ...authorsPagination, page: newPage, limit: 4 }
    );

    // get the new page from api
    const { data, paginationInfo } = parsePaginatedResponse(
      await getAuthors(params)
    );

    // set the values
    setAuthorsPagination(paginationInfo);
    setAuthors(data);
  };

  const handleBooksPageChange = async (newPage) => {
    // construct the params
    const params = createPaginationParams(
      { key },
      { ...booksPagination, page: newPage, limit: 4 }
    );

    // get the new page from api
    const { data, paginationInfo } = parsePaginatedResponse(
      await getBooks(params)
    );

    // set the values
    setBooksPagination(paginationInfo);
    setBooks(data);
  };
  return (
    <div>
      <Navbar />
      <div className="container main-content">
        <h2>Authors</h2>
        <div className="row">
          {authors.map((author) => (
            <div key={author?._id} className="col-3 mb-3">
              <Card type="author" object={author} />
            </div>
          ))}
          <div className="row justify-content-center">
            <div className="col-6">
              <Paginator
                paginationInfo={authorsPagination}
                onPageChange={handleAuthorsPageChange}
              />
            </div>
          </div>
        </div>
        <hr />
        <h2>Books</h2>
        <div className="row">
          {books.map((book) => (
            <div key={book?._id} className="col-3 mb-3">
              <Card type="book" object={book} />
            </div>
          ))}
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <Paginator
              paginationInfo={booksPagination}
              onPageChange={handleBooksPageChange}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
