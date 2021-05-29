import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteReview,
  editUserReview,
  getBookReviews,
  getUserReview,
} from "../services/reviewsServices";
import {
  createPaginationParams,
  parsePaginatedResponse,
} from "../utils/pagination";
import Paginator from "./Paginator";

export const Reviews = ({ bookId, isUpdated }) => {
  const userId = JSON.parse(localStorage.getItem("user"))?._id;
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState({});
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [editReview, changeEditReview] = useState(false);
  useEffect(() => {
    handlePageChange();
    getCurrentUserReview();
  }, [isUpdated]);

  const handlePageChange = async (newPage) => {
    // construct the params
    const params = createPaginationParams({}, { ...pagination, page: newPage });

    // get the new page from api
    const { data, paginationInfo } = parsePaginatedResponse(
      await getBookReviews(bookId, params)
    );
    // set the values
    setPagination(paginationInfo);
    setReviews(data);
  };

  const getCurrentUserReview = async () => {
    try {
      const {
        data: { data },
      } = await getUserReview(bookId, { userId });
      setMyReview(data);
    } catch (err) {
      setMyReview("");
    }
  };

  const deleteMyReview = () => {
    deleteReview(bookId, myReview?._id);
    handlePageChange();
    getCurrentUserReview();
  };

  const updateMyReview = () => {
    editUserReview(bookId, { review: myReview.review }, { userId });
    changeEditReview(false);
    handlePageChange();
    getCurrentUserReview();
  };

  return reviews.length > 0 ? (
    <>
      {userId ? (
        <>
          {editReview ? (
            <div className="row align-baseline">
              <div className="col-md-10">
                <textarea
                  value={myReview.review}
                  onChange={(e) =>
                    setMyReview({ ...myReview, review: e?.target?.value })
                  }
                  className="form-control"
                ></textarea>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-success"
                  onClick={() => updateMyReview()}
                >
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-between">
              <p>
                <span>
                  <Link to={`/author/${myReview?._id}`}>
                    {myReview?.user?.firstName +
                      "" +
                      myReview?.user?.lastName +
                      ": "}
                  </Link>
                </span>
                {myReview.review}
              </p>
              <div>
                <button
                  onClick={() => changeEditReview(true)}
                  className="mx-2 btn btn-success"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => deleteMyReview()}
                  className="mx-2 btn btn-danger"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}
      <hr />
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
