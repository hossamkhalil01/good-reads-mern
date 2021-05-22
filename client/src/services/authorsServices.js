import requests from "../api/requests";

export const getAuthors = async () => {
  return await requests.get('authors');
};
