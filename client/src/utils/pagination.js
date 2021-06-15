export const createPaginationParams = (params, { page, limit = 3 }) => {
  return { ...params, page, limit };
};

export const parsePaginatedResponse = ({ data: { data } }) => {
  const docs = data.docs;

  // extract pagination Info
  const paginationInfo = {
    nextPage: data.nextPage,
    prevPage: data.prevPage,
    totalPages: data.totalPages,
    totalDocs: data.totalDocs,
    page: data.page,
    pageCount: data.pageCount,
    limit: data.limit,
  };
  return { data: docs, paginationInfo };
};
