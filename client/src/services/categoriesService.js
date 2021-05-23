import requests from "../api/requests";
import { categoriesBase } from "../api/urls";

export const getCategories = async (params = {}) => {
  return await requests.get(categoriesBase, params);
};

export const updateCategory = async (id, body) => {
  return await requests.update(categoriesBase + id, body);
};

export const deleteCategory = async (id) => {
  return await requests.delete(categoriesBase + id);
};

export const createCategory = async (body) => {
  return await requests.create(categoriesBase, body);
};