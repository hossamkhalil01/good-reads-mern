import requests from "../api/requests";

const getRates = (bookId) => {
  return requests
    .getResource(`books/${bookId}/rates`)
    .then((res) => res.json());
};

const userRate = (bookId, userId) => {
  return requests
    .getResource(`books/${bookId}/rates?userId=${userId}`)
    .then((res) => res.json());
};

const updateUserRate = (bookId, userId, rating) => {
  return requests
    .putResource(`books/${bookId}/rates?userId=${userId}`, {}, { rating })
    .then((res) => res.json());
};

const addUserRate = (bookId, userId, rating) => {
  return requests
    .postResource(`books/${bookId}/rates`, {}, { userId, rating })
    .then((res) => res.json());
};

const exports = {
  getRates,
  userRate,
  updateUserRate,
  addUserRate,
};

export default exports;
