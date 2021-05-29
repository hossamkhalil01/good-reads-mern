const Shelf = require("../models/shelf");
const { extractPaginationInfo } = require("../utils/pagination");
const {
  statusCodes,
  sendResponse,
  sendError,
  errorMessages,
} = require("../utils/responses");

// use the get user middleware

const getUserShelf = async (req, res) => {

  const currentUser = req.user;

  const [{ limit, page }, filter] = extractPaginationInfo(req.query);

  // the pagination options
  const options = {
    sort: { _id: -1 },
    populate: {
      path: 'book',
      populate: {
        path: 'authors',
      },
      page,
      limit,
    }
  };

  try {
    // get the books
    const shelfBooks = await Shelf.paginate({ user: currentUser, ...filter }, options);

    // build the resulting object
    return sendResponse(res, shelfBooks, statusCodes.success.ok);

  } catch (error) {
    return sendError(res, error.message, statusCodes.error.serverError);
  }
};

const updateBookStatus = async (req, res) => {

  const currentUser = req.user;
  const bookId = req.body.bookId;
  const status = req.body.status;

  // search for the this book in the user's shelf
  const shelfBook = await Shelf.findOne({ book: bookId, user: currentUser });

  // doesn't exist in the shelf --> create it
  if (!shelfBook)
    return createShelfBook({ user: currentUser._id, book: bookId, status }, res);

  // return if the status is not defined
  if (!status)
    return sendError(res, errorMessages.missingParam, statusCodes.error.invalidData);

  // update the book status if found
  shelfBook.status = status;

  // save the changes
  try {
    await shelfBook.save();
    return sendResponse(res, shelfBook, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
}

const createShelfBook = async (data, res) => {

  try {
    const shelfBook = await Shelf.create(data);
    return sendResponse(res, shelfBook, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
}

module.exports = { getUserShelf, updateBookStatus };
