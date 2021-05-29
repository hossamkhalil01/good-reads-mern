const express = require("express");
const shelfController = require("../controllers/shelfController");


// const getUserMiddleware = require("../middlewares/getUser");

// init router
const Router = express.Router();

/** 
GET 
Route: /
Query: pagination info (limit & page) , status filter
     ('Want To Read', 'Read', 'Currently Reading')
Results: Get User Shelf 
**/
Router.get("/", shelfController.getUserShelf);


/** 
PUT 
Route: / 
Results: Update Shelf Book Status
Body: status, bookd
**/
Router.patch("/", shelfController.updateBookStatus);


module.exports = Router;
