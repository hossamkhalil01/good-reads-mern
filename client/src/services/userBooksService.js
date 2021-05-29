import requests from "../api/requests";
import { shelfBase } from "../api/urls";

export const bookStatus = {
  'reading': 'Read',
  'read': 'Currently Reading',
  'want': 'Want To Read'
}

export const getUserShelf = async () => {
  return await requests.get(shelfBase)
}

export const getBookStatus = async (bookId) => {
  return await requests.get(shelfBase, { book: bookId });
}

export const updateBookStatus = async (bookId, status) => {
  return await requests.update(shelfBase, { bookId, status })
}