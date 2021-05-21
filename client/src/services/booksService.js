import requests from "../api/requests";

const getBooksByCatgoryId = (catgoryId) => {
  return requests
    .getResource(`books?catgoryId=${catgoryId}`)
    .then((res) => res.json());
};

const exports = {
  getBooksByCatgoryId,
};

export default exports;
