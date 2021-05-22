import requests from "../api/requests";
import { getShelfBookUrl } from "../api/urls";

export const bookStatus = {
  'reading': 'Read',
  'read': 'Currently Reading',
  'want': 'Want To Read'
}

export const updateUserBookStatus = async (userId, bookId, status) => {
  return await requests.patch(getShelfBookUrl(userId, bookId), { status })
}