const express = require("express");
const usersController = require("../controllers/usersController");

// init router
const Router = express.Router();

/** 
GET 
Route: / 
Results: All Users
**/
Router.get("/", usersController.getUsers);

/** 
POST 
Route: / 
Results: Create New User
**/
Router.post("/", usersController.createUser);

module.exports = Router;
