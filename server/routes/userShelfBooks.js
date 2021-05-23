const express = require("express");
const shelfBooksController = require("../controllers/shelfBooksController");
const getUserMiddleware = require("../middlewares/getUser");

// init router
const Router = express.Router({ mergeParams: true });

Router.use(getUserMiddleware)

/** 
GET 
Route: /
Results: Get User Shelf 
**/
Router.get("/", shelfBooksController.getUserShelf);


/** 
PUT 
Route: / 
Results: Update Shelf Book Status
Body: status
**/
Router.patch("/:bookId", shelfBooksController.updateBookStatus);


/** 
DELETE 
Route: / 
Results: Delete Book from User Shelf
**/
Router.delete("/:bookId", shelfBooksController.deleteShelfBook);


module.exports = Router;
