const express = require("express");
const authorsController = require("../controllers/authorsController");
// init router
const Router = express.Router();

/** 
GET 
Route: /:id
Results: get author
**/
Router.get("/:id", authorsController.getAuthor);

/** 
GET 
Route: / 
Results: All Authors
**/
Router.get("/", authorsController.getAuthors);

/** 
POST 
Route: / 
Results: Create New Author
**/
Router.post("/", authorsController.createAuthor);

/** 
DELETE 
Route: / 
Results: delete Author
**/
Router.delete("/:id", authorsController.deleteAuthor);

/** 
PUT 
Route: / 
Results: Update Author
**/
Router.put("/:id", authorsController.updateAuthor);

module.exports = Router;
