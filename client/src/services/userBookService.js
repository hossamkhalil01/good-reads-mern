import requests from "../api/requests";


export const bookStatus = {
  'reading': 'Read',
  'read': 'Currently Reading',
  'want': 'Want To Read'
}



export const updateUserBookStatus = (userId, bookId) => {
  return requests
    .putResource(`users/${userId}/rates?userId=${userId}`, {}, {  })
    .then((res) => res.json());
}