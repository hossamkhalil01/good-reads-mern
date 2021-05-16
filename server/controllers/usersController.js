const User = require("../models/user");
const {
  statusCodes,
  sendResponse,
  sendError,
  errorMessages,
} = require("../utils/responses");

const getUsers = async (req, res) => {
  const users = await User.find();
  return sendResponse(res, users, statusCodes.success.ok);
};

const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.find({ _id: id });
    return sendResponse(res, user, statusCodes.success.ok);
  } catch (error) {
    return sendError(
      res,
      errorMessages.notFound,
      statusCodes.error.invalidData
    );
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return sendResponse(res, user, statusCodes.success.created);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findOneAndDelete({ _id: id });

    // user not found
    if (!deletedUser)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // deleted
    return sendResponse(res, {}, statusCodes.success.noContent);
  } catch (error) {
    // invalid params
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, updates, {
      new: true,
      runValidators: true,
    });

    // user not found
    if (!updatedUser)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // updated
    return sendResponse(res, updatedUser, statusCodes.success.ok);
  } catch (error) {
    // invalid params
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = { getUser, getUsers, createUser, deleteUser, updateUser };
