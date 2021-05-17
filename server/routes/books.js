const express = require("express");
const booksController = require("../controllers/booksController");
// init router
const Router = express.Router();

/** 
GET 
Route: /:id
Results: get Book
**/
Router.get("/:id", booksController.getBook);

/** 
GET 
Route: / 
Results: All Books
**/
Router.get("/", booksController.getBooks);

/** 
POST 
Route: / 
Results: Create New Book
**/
Router.post("/", booksController.createBook);

/** 
DELETE 
Route: / 
Results: delete Book
**/
Router.delete("/:id", booksController.deleteBook);

/** 
PUT 
Route: / 
Results: Update Book
**/
Router.put("/:id", booksController.updateBook);

module.exports = Router;
