import requests from "../api/requests";


export const bookStatus = {
  'reading': 'Read',
  'read': 'Currently Reading',
  'want': 'Want To Read'
}


export const updateUserBookStatus = (userId, bookId, status) => {
  return requests
    .putResource(`users/${userId}/shelf/${bookId}`, {}, { status })
    .then((res) => res.json());
}