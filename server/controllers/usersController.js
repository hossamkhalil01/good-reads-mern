const User = require("../models/user");
const { statusCodes, sendResponse, sendError } = require("../utils/responses");

const getUsers = async (req, res) => {
  sendResponse(res, await User.find(), statusCodes.success.ok);
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    sendResponse(res, user, statusCodes.success.created);
  } catch (error) {
    sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = { getUsers, createUser };
