import requests from "../api/requests";
import { authorsBase } from "../api/urls";

export const getAuthors = async (params) => {
  return await requests.get('authors', params);
};

export const updateAuthor = async (authorId, body) => {
  return await requests.update(authorsBase + authorId, body);
};

export const deleteAuthor = async (authorId) => {
  return await requests.delete(authorsBase + authorId);
};

export const createAuthor = async (body) => {
  return await requests.create(authorsBase, body);
};
