const Author = require("../models/author");
console.log(Author);
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const getAuthor = async (req, res) => {
  const id = req.params.id;
  try {
    const author = await Author.find({ _id: id });
    return sendResponse(res, author, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const getAuthors = async (req, res) => {
  const authors = await Author.find();
  return sendResponse(res, authors, statusCodes.success.ok);
};

const createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    return sendResponse(res, author, statusCodes.success.created);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const deleteAuthor = async (req, res) => {
  const id = req.params.id;

  try {
    const author = await Author.findOneAndDelete({ _id: id });

    // author not found
    if (!author)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // deleted
    return sendResponse(res, author, statusCodes.success.noContent);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const updateAuthor = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const updatedAuthor = await Author.findOneAndUpdate({ _id: id }, updates, {
      new: true,
      runValidators: true,
    });

    // catrgory not found
    if (!updatedAuthor)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // updated
    return sendResponse(res, updatedAuthor, statusCodes.success.ok);
  } catch (error) {
    // invalid params
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = {
  getAuthor,
  getAuthors,
  createAuthor,
  deleteAuthor,
  updateAuthor,
};
