export const hostUrl = "http://localhost:8000/";
export const authUrl = `${hostUrl}auth/`;

// resources base url
export const booksBase = "books/";
export const usersBase = "users/";
export const categoriesBase = "categories/";
export const authorsBase = "authors/";

export const getRatesUrl = (bookId) => {
  return `${booksBase}${bookId}/rates/`;
};

export const getUserShelfUrl = (userId) => {
  return `${usersBase}${userId}/shelf/`;
};

export const getShelfBookUrl = (userId, bookId) => {
  return getUserShelfUrl(userId) + bookId;
};

export const getSearchUrl = (q) => {
  return `/search?q=${q}`;
};

// images base url
export const imagesBase = "public/img";
