const User = require("../models/user");


const {
  statusCodes,
  sendResponse,
  sendError,
  errorMessages,
} = require("../utils/responses");

// use the get user middleware

const getUserShelf = async (req, res) => {
  const user = req.user;
  return sendResponse(res, user.shelf, statusCodes.success.ok);
};

const updateBookStatus = async (req, res) => {

  let user = req.user;
  const bookId = req.params.bookId;
  const status = req.body.status;

  // search for the user's shelf
  const bookIndx = getBookIndex(user.shelf, bookId);

  // update or create book status if not found
  if (bookIndx === false) {
    user.shelf.push({ book: bookId, status });
  } else {
    user.shelf[bookIndx].status = status;
  }
  // save the changes
  try {
    await user.save();
    return sendResponse(res, user, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }

}

const deleteShelfBook = async (req, res) => {

  let user = req.user;
  const bookId = req.params.bookId;

  try {
    user.shelf.pull({ book: bookId });
    user.save();
    return sendResponse(res, {}, statusCodes.success.noContent);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.notFound);
  }
}

const getBookIndex = (shelf, bookId) => {

  const bookIndx = shelf.findIndex(({ book }) => book == bookId);

  // not found
  if (bookIndx === -1) return false;

  return bookIndx;
}


module.exports = { getUserShelf, updateBookStatus, deleteShelfBook };
