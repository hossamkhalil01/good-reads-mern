import requests from "../api/requests";
import { getReviewsUrl } from "../api/urls";

export const getBookReviews = (bookId, params) => {
  return requests.get(getReviewsUrl(bookId), params);
};

export const addReview = (bookId, review) => {
  return requests.create(getReviewsUrl(bookId), review);
};

export const getUserReview = (bookId, currentUser) => {
  return requests.get(getReviewsUrl(bookId), currentUser);
};

export const deleteReview = (bookId, reviewId) => {
  return requests.delete(getReviewsUrl(bookId) + reviewId);
};

export const editUserReview = (bookId, updatedReview, currentUser) => {
  return requests.update(getReviewsUrl(bookId), updatedReview, currentUser);
};
