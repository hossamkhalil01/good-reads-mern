import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { hostUrl } from "../api/urls";
import AvgRating from "../components/AvgRate";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Paginator from "../components/Paginator";
import UserBookStatus from "../components/UserBookStatus";
import UserRating from "../components/UserRate";
import { getAuthor } from "../services/authorsService";
import { currentUser } from "../services/authService";
import { getAuthorBooks } from "../services/booksService";
import { getUser } from "../services/userService";
import "../styles/AuthorPage.css";
import {
  createPaginationParams,
  parsePaginatedResponse,
} from "../utils/pagination";
import { capitalize, dateFormatter } from "../utils/utils";

export const AuthorPage = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [updatedUser, setUpdatedUser] = useState({});

  const handlePageChange = async (newPage) => {
    // construct the params
    const params = createPaginationParams(
      {},
      { ...pagination, page: newPage, limit: 5 }
    );

    // get the new page from api
    const { data, paginationInfo } = parsePaginatedResponse(
      await getAuthorBooks(id, params)
    );

    // set the values
    setPagination(paginationInfo);
    setBooks(data);
    console.log(data);
  };

  const getUpdatedUser = async (userId) => {
    const data = await getUser(userId);

    setUpdatedUser(data.data.data);
  };

  const retriveAuthor = async (authorId) => {
    const data = await getAuthor(authorId);
    console.log(data.data.data);
    setAuthor(data.data.data);
  };

  const getUserBook = (book) => {
    const shelf = updatedUser.shelf;
    const userBook = shelf.find((userBook) => {
      return userBook.book == book._id;
    });
    console.log(userBook);
    if (userBook) return userBook.status;
    return;
  };

  const retriveAuthorbooks = async (authorId) => {
    const data = await getAuthorBooks(authorId);
    console.log(data);
  };

  useEffect(() => {
    retriveAuthor(id);
    // retriveAuthorbooks(id);
    handlePageChange();
    getUpdatedUser(currentUser._id);
  }, [id]);

  return (
    <div className="AuthorPage">
      <Navbar />
      <div className="author-content">
        <div className="row mt-5">
          <div className="col-md-4 justify-content-center">
            {author?.photo ? (
              <img
                className="author-img"
                src={`${hostUrl}${author?.photo}`}
                alt=""
              />
            ) : (
              ""
            )}
          </div>
          <div className="col-md-6">
            {author?.firstName ? (
              <div>
                <h1>
                  {capitalize(author?.firstName)} {capitalize(author?.lastName)}
                </h1>
                <h6>{dateFormatter(author?.bDate)}</h6>
                <p>{author?.description}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row justify-content-center mt-2">
          <div className="col-md-3 text-center">
            <h2>Author's Books</h2>
          </div>
        </div>
        {!books.length ? (
          <div className="row justify-content-center mt-3">
            <div className="col-md-6">
              <div className="alert alert-info">
                No books for this author yet.
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="mt-5">
          {books.map((book) => (
            <div>
              <div key={book?._id} className="row mb-3">
                <div className="col-md-4">
                  <img
                    className="author-book-img"
                    src={`${hostUrl}${book?.coverImage}`}
                    alt=""
                  />
                </div>
                <div className="col-md-4">
                  <h5>{capitalize(book?.title)}</h5>
                  <AvgRating bookId={book?._id} />
                </div>
                <div className="col-md-4">
                  {updatedUser?.shelf && book?.title ? (
                    <UserBookStatus
                      bookId={book?._id}
                      status={getUserBook(book)}
                      onStatusChange={() => {}}
                    />
                  ) : (
                    ""
                  )}
                  <br />
                  <UserRating bookId={book?._id} />
                </div>
              </div>
              <div className="row justify-content-center mb-3">
                <div className="col-md-6">
                  <hr />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="pagination-component">
              <Paginator
                paginationInfo={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
