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

const multer = require("multer");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/avatars/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// Init Upload
const upload = multer({
  storage: storage,
});

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

Router.post("/register", upload.single("myImage"), async (req, res) => {
  const body = JSON.parse(req.body.body);
  let avatar = "public/img/avatars/default.png";

  if (req.file) {
    avatar = req.file.destination + req.file.filename;
  }

  const email = body.email;
  const firstName = body.firstName;
  const lastName = body.lastName;
  const password = body.password;

  try {
    let user = await User.create({
      email,
      firstName,
      lastName,
      password,
      avatar,
    });
    const jwt = issueJWT.issueJWT(user);

    delete user._doc.password;
    return sendResponse(
      res,
      { user, token: jwt.token, expiresIn: jwt.expires },
      statusCodes.success.created
    );
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
});

module.exports = Router;
