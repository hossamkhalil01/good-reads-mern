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
    <div>
      <textarea
        value={review}
        onChange={(e) => updateReview(e.target.value)}
        className="form-control"
      ></textarea>
      <button onClick={() => handleReviewSubmit()} className="btn btn-success">
        Add
      </button>
      {error === "" ? "" : <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
