const Book = require("../models/book");
const { extractPaginationInfo } = require("../utils/pagination");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const getBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findOne({ _id: id })
      .populate("authors")
      .populate("categories");
    // book not found
    if (!book)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    return sendResponse(res, book, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const getBooks = async (req, res) => {
  // process the query params
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);
  if (filter.key) {
    filter["title"] = manipulateSearchParams(filter.key);
    delete filter.key;
  }
  // the pagination options
  const options = {
    sort: { _id: -1 },
    populate: ["authors", "categories"],
    lean: true,
    page,
    limit,
  };

  try {
    // get the books
    const books = await Book.paginate(filter, options);
    // build the resulting object
    return sendResponse(res, books, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const getBooksByAuthor = async (req, res) => {
  // process the query params
  const authorId = req.params.authorId;

  const [{ limit, page }, filter] = extractPaginationInfo(req.query);
  // the pagination options
  const options = {
    sort: { title: -1 },
    populate: ["authors", "categories"],
    lean: true,
    page,
    limit,
  };

  try {
    // get the books
    const books = await Book.paginate({ authors: authorId }, options);

    // build the resulting object
    return sendResponse(res, books, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const manipulateSearchParams = (key) => {
  return { $regex: key };
};

const createBook = async (req, res) => {
  const body = JSON.parse(req.body.body);
  let coverImage = "public/img/books/default.png";
  if (req.file) {
    coverImage = req.file.destination + req.file.filename;
  }

  const title = body.title;
  const authors = body.authors;
  const categories = body.categories;
  const description = body.description;

  try {
    const book = await Book.create({
      title,
      authors,
      categories,
      coverImage,
      description,
    });
    return sendResponse(res, book, statusCodes.success.created);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};
const deleteBook = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findOneAndDelete({ _id: id });

    // book not found
    if (!book)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // deleted
    return sendResponse(res, book, statusCodes.success.noContent);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const updateBook = async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  let updates = JSON.parse(req.body.body);
  if (req.file) {
    const coverPhoto = req.file.destination + req.file.filename;
    updates.coverImage = coverPhoto;
  }

  try {
    const updatedBook = await Book.findOneAndUpdate({ _id: id }, updates, {
      new: true,
      runValidators: true,
    })
      .populate("authors")
      .populate("categories");

    // catrgory not found
    if (!updatedBook)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // updated
    return sendResponse(res, updatedBook, statusCodes.success.ok);
  } catch (error) {
    // invalid params
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = {
  getBook,
  getBooks,
  createBook,
  deleteBook,
  updateBook,
  getBooksByAuthor,
};
