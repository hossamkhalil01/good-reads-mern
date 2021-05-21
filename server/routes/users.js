const express = require("express");
const usersController = require("../controllers/usersController");
const shelfBooksRouter = require("./userShelfBooks");

// init router
const Router = express.Router();

// add shelf sub routes
Router.use("/:userId/shelf", shelfBooksRouter);


/** 
GET 
Route: /:id
Results: get User
**/
Router.get("/:id", usersController.getUser);

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

/** 
DELETE 
Route: / 
Results: delete User
**/
Router.delete("/:id", usersController.deleteUser);

/** 
PUT 
Route: / 
Results: Update User
**/
Router.put("/:id", usersController.updateUser);

module.exports = Router;
