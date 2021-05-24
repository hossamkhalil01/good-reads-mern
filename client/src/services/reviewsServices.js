import requests from "../api/requests";
import { getReviewsUrl } from "../api/urls";

export const getBookReviews = (bookId, params) => {
  return requests.get(getReviewsUrl(bookId), params);
};

export const addReview = (bookId, review) => {
  return requests.create(getReviewsUrl(bookId), review);
};
