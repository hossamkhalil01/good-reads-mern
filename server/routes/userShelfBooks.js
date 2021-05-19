const express = require("express");
const shelfBooksController = require("../controllers/shelfBooksController");
const getUserMiddleware = require("../middlewares/getUser");

// init router
const Router = express.Router({ mergeParams: true });

Router.use(getUserMiddleware)
/** 
GET 
Route: /
Results: Get book from User Shelf 
**/
Router.get("/", shelfBooksController.getShelfBook);


/** 
POST 
Route: / 
Results: add Book to User Shelf
**/
// Router.post("/:id", shelfBooksController.createBook);

/** 
DELETE 
Route: / 
Results: delete Book from User Shelf
**/
// Router.delete("/:id", shelfBooksController.deleteBook);

/** 
PUT 
Route: / 
Results: Update User Shelf Book
**/
// Router.put("/:id", shelfBooksController.updateBook);

module.exports = Router;
