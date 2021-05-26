import { useEffect, useState } from "react";
import {
  createPaginationParams,
  parsePaginatedResponse,
} from "../utils/pagination";
import { getBookReviews } from "../services/reviewsServices";
import { Link } from "react-router-dom";
import Paginator from "./Paginator";

export const Reviews = ({ bookId, isUpdated }) => {
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  useEffect(() => {
    handlePageChange();
  }, [isUpdated]);

  const handlePageChange = async (newPage) => {
    // construct the params
    const params = createPaginationParams({}, { ...pagination, page: newPage });

    // get the new page from api
    const { data, paginationInfo } = parsePaginatedResponse(
      await getBookReviews(bookId, params)
    );
    //   await services.getAuthors(params)
    // set the values
    setPagination(paginationInfo);
    setReviews(data);
  };

  return reviews.length > 0 ? (
    <>
      {reviews.map((review) => (
        <div key={review._id}>
          <p>
            <span>
              <Link to={`/author/${review.user._id}`}>
                {review.user.firstName + "" + review.user.lastName + ": "}
              </Link>
            </span>
            {review.review}
          </p>
          <hr />
        </div>
      ))}
      <div className="row justify-content-center">
        <div className="col-6">
          <Paginator
            paginationInfo={pagination}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  ) : (
    <div className="alert alert-info">no reviews for this book</div>
  );
};
