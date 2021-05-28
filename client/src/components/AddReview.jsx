import { useState } from "react";
import { addReview } from "../services/reviewsServices";
export const AddReview = ({ bookId, onReviewsChanged }) => {
  const [review, updateReview] = useState("");
  const [error, setError] = useState("");
  const handleReviewSubmit = async () => {
    addReview(bookId, {
      userId: "60a981eb95ff413435e2364f",
      review,
    })
      .then((res) => {
        updateReview("");
        setError("");
        onReviewsChanged((review) => !review);
      })
      .catch((err) => setError("you cant review same book twice"));
  };
  return (
    <div className="row align-baseline">
      <div className="col-md-10">
        <textarea
          value={review}
          onChange={(e) => updateReview(e.target.value)}
          className="form-control"
        ></textarea>
      </div>
      <div className="col-md-2">
        <button
          onClick={() => handleReviewSubmit()}
          className="btn btn-success"
        >
          Add
        </button>
      </div>
      {error === "" ? (
        ""
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-9 alert alert-danger mt-3">{error}</div>
          <div className="col-md-2"></div>
        </div>
      )}
    </div>
  );
};
