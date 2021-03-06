import requests from "../api/requests";
import { booksBase } from "../api/urls";

export const getBooks = async (params) => {
  return await requests.get(booksBase, params);
};

export const getBook = async (id) => {
  return await requests.get(`${booksBase}${id}`);
};

export const getAuthorBooks = async (authorId, params) => {
  return await requests.get(`${booksBase}authorBooks/${authorId}`, params);
};

export const createBook = async (body) => {
  return await requests.create(booksBase, body);
};

export const updateBook = async (id, body) => {
  return await requests.update(booksBase + id, body);
};

export const deleteBook = async (id) => {
  return await requests.delete(booksBase + id);
};
