import { useEffect, useState } from "react";
import Card from "../components/Card";
import * as services from "../services/authorsService";
import Paginator from "../components/Paginator";
import {
  createPaginationParams,
  parsePaginatedResponse,
} from "../utils/pagination";
import { Reviews } from "../components/Reviews";
import { AddReview } from "../components/AddReview";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [isUpdated, updateReview] = useState(false);
  useEffect(() => {
    handlePageChange();
  }, []);

  const handlePageChange = async (newPage) => {
    // construct the params
    const params = createPaginationParams({}, { ...pagination, page: newPage });

    // get the new page from api
    const { data, paginationInfo } = parsePaginatedResponse(
      await services.getAuthors(params)
    );

    // set the values
    setPagination(paginationInfo);
    setAuthors(data);
  };

  return (
    <div className="container">
      <AddReview
        onReviewsChanged={updateReview}
        bookId="60aabaf600ecbab7160a97db"
      />
      <Reviews isUpdated={isUpdated} bookId="60aabaf600ecbab7160a97db" />
      <div className="row">
        {authors.map((author) => (
          <div key={author?._id} className="col-3 mb-3">
            <Card type="author" object={author} />
          </div>
        ))}
      </div>

      <div className="row justify-content-center">
        <div className="col-6">
          <Paginator
            paginationInfo={pagination}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Authors;
