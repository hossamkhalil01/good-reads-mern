
const User = require("../models/user");
const {
  statusCodes,
  sendResponse,
  sendError,
  errorMessages,
} = require("../utils/responses");

const getUser = async (req, res, next) => {

  const userId = req.params.userId;
  try {
    const user = await User.findOne({ _id: userId });
    // user not found
    if (!user)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    req.user = user;
    next();
  } catch (error) {
    return sendError(
      res,
      errorMessages.notFound,
      statusCodes.error.invalidData
    );
  }
}

module.exports = getUser