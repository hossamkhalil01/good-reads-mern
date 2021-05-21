import requests from "../api/requests";

const getCategories = () => {
  return requests.getResource(`categories`).then((res) => res.json());
};

const exports = {
  getCategories,
};

export default exports;
