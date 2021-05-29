import { useState } from "react";
import { currentUser } from "../services/authService";
import { addReview } from "../services/reviewsServices";


const userId = currentUser?._id;

export const AddReview = ({ bookId, onReviewsChanged }) => {

  const [review, updateReview] = useState("");
  const [error, setError] = useState("");

  const handleReviewSubmit = async () => {
    if (review === "") return setError("you can't add empty review ");
    addReview(bookId, {
      userId,
      review,
    })
      .then((res) => {
        updateReview("");
        setError("");
        onReviewsChanged((review) => !review);
      })
      .catch((err) => {
        setError("you can't review same book twice");
      });
  };

  const upadteInputStates = () => {
    setError("");
  };

  return (
    <div className="row align-baseline">
      <div className="col-md-10">
        <textarea
          onBlur={() => upadteInputStates()}
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
