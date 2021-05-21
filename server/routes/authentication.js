const express = require("express");
const issueJWT = require("../utils/issueJWT");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  statusCodes,
  sendResponse,
  sendError,
  errorMessages,
} = require("../utils/responses");

// init router
const Router = express.Router();

Router.post("/login", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ email: req.body.email });
    // user not found
    if (!user)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    var passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return sendError(
        res,
        errorMessages.notFound,
        statusCodes.error.invalidData
      );
    }

    const jwt = issueJWT.issueJWT(user);
    delete user._doc.password;

    return sendResponse(
      res,
      { user: user, token: jwt.token, expiresIn: jwt.expires },
      statusCodes.success.ok
    );
  } catch (error) {
    return sendError(
      res,
      errorMessages.notFound,
      statusCodes.error.invalidData
    );
  }
});

Router.post("/register", async (req, res) => {
  try {
    let user = await User.create(req.body);
    const jwt = issueJWT.issueJWT(user);

    delete user._doc.password;
    return sendResponse(
      res,
      { user: user, token: jwt.token, expiresIn: jwt.expires },
      statusCodes.success.created
    );
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
});

module.exports = Router;
