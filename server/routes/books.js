const express = require("express");
const booksController = require("../controllers/booksController");
const rateRouter = require("../routes/rates");
const reviewRouter = require("../routes/reviews");

// init router
const Router = express.Router();

// add rate sub routes
Router.use("/:bookId/rates", rateRouter);

// add review sub routes
Router.use("/:bookId/reviews", reviewRouter);
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
Results: Delete Book
**/
Router.delete("/:id", booksController.deleteBook);

/** 
PUT 
Route: / 
Results: Update Book
**/
Router.put("/:id", booksController.updateBook);

module.exports = Router;
