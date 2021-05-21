import requests from "../api/requests";

const getAuthors = () => {
  return requests.getResource(`authors`).then((res) => res.json());
};

const exports = {
  getAuthors,
};

export default exports;
