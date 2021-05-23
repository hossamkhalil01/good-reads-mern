import requests from "../api/requests";

export const getAuthors = async (params) => {
  return await requests.get('authors', params);
};
