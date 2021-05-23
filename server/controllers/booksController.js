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

  // the pagination options
  const options = {
    sort: { _id: -1 },
    populate: 'authors',
    populate: 'categories',
    lean: true,
    page,
    limit,
  }

  try {
    // get the books
    const books = await Book.paginate(filter, options)
    // build the resulting object
    return sendResponse(res, books, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }

};

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
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
  const id = req.params.id;
  const updates = req.body;

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
};
