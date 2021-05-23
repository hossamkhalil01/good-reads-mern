import requests from "../api/requests";
import { booksBase } from "../api/urls";

export const getBooksByCatgoryId = async (catgoryId) => {
  return await requests.get(booksBase, { catgoryId })
};

