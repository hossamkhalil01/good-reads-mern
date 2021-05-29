const express = require("express");
const categoriesController = require("../controllers/categoriesController");
// init router
const Router = express.Router();
const passport = require("passport");

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
Router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  categoriesController.createCategory
);

/** 
DELETE 
Route: / 
Results: Delete Category
**/
Router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  categoriesController.deleteCategory
);

/** 
PUT 
Route: / 
Results: Update Category
**/
Router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  categoriesController.updateCategory
);

module.exports = Router;
