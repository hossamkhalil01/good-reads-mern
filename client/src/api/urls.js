export const hostUrl = "http://localhost:8000/";
export const authUrl = `${hostUrl}auth/`;

// resources base url
export const booksBase = "books/";
export const usersBase = "users/";
export const categoriesBase = "categories/";
export const authorsBase = "authors/";
export const shelfBase = "shelf/";

export const getRatesUrl = (bookId) => {
  return `${booksBase}${bookId}/rates/`;
};

export const getReviewsUrl = (bookId) => {
  return `${booksBase}${bookId}/reviews/`;
};

export const getSearchUrl = (q) => {
  return `/search?q=${q}`;
};

// images base url
export const imagesBase = "public/img";
