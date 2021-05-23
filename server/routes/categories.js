const express = require("express");
const categoriesController = require("../controllers/categoriesController");
// init router
const Router = express.Router();

/** 
GET 
Route: /:id
Results: get Category
**/
Router.get("/:id", categoriesController.getCategory);

/** 
GET 
Route: / 
Results: All Categories
**/
Router.get("/", categoriesController.getCategories);

/** 
POST 
Route: / 
Results: Create New Category
**/
Router.post("/", categoriesController.createCategory);

/** 
DELETE 
Route: / 
Results: Delete Category
**/
Router.delete("/:id", categoriesController.deleteCategory);

/** 
PUT 
Route: / 
Results: Update Category
**/
Router.patch("/:id", categoriesController.updateCategory);

module.exports = Router;
