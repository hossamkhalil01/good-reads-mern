import requests from "../api/requests";
import { categoriesBase } from "../api/urls";

export const getCategories = async (params = {}) => {
  return await requests.get(categoriesBase, params)
};
