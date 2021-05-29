import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { hostUrl } from "../api/urls";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Paginator from "../components/Paginator";
import { getAuthor } from "../services/authorsService";
import { getAuthorBooks } from "../services/booksService";
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

  const retriveAuthor = async (authorId) => {
    const data = await getAuthor(authorId);
    console.log(data.data.data);
    setAuthor(data.data.data);
  };

  const retriveAuthorbooks = async (authorId) => {
    const data = await getAuthorBooks(authorId);
    console.log(data);
  };

  useEffect(() => {
    retriveAuthor(id);
    // retriveAuthorbooks(id);
    handlePageChange();
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
        <div className="row">
          <Paginator
            paginationInfo={pagination}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
