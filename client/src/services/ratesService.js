import requests from "../api/requests";
import { getRatesUrl } from "../api/urls";

export const getRates = async (bookId) => {
  return await requests.get(getRatesUrl(bookId));
};

export const userRate = async (bookId, userId) => {
  return await requests.get(getRatesUrl(bookId), { userId });
};

export const updateUserRate = async (bookId, userId, rating) => {
  return await requests.update(getRatesUrl(bookId), { rating, userId });
};

export const addUserRate = async (bookId, userId, rating) => {
  return await requests.create(getRatesUrl(bookId), { rating, userId });
};
