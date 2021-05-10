const express = require("express");
const booksController = require("../controllers/booksController");

// init router
const Router = express.Router();

/** 
GET 
Route: / 
Results: All Books
**/
Router.get("/", booksController.getBooks);

module.exports = Router;
