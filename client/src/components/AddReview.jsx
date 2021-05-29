import { useState } from "react";
import { useHistory } from "react-router-dom";
import { addReview } from "../services/reviewsServices";
export const AddReview = ({ bookId, onReviewsChanged }) => {
  const userId = JSON.parse(localStorage.getItem("user"))?._id;
  let history = useHistory();
  const [review, updateReview] = useState("");
  const [error, setError] = useState("");

  const handleReviewSubmit = async () => {
    if (userId) {
      if (review === "") return setError("you can't add empty review ");
      addReview(bookId, {
        userId: userId,
        review,
      })
        .then((res) => {
          updateReview("");
          setError("");
          onReviewsChanged((review) => !review);
        })
        .catch((err) => {
          console.log(err);
          setError("you can't review same book twice");
        });
    } else {
      history.push("/login");
    }
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
