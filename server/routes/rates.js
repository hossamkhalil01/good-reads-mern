const express = require("express");
const ratesController = require("../controllers/ratesController");
// init router
const Router = express.Router({ mergeParams: true });

/** 
GET 
Route: /
Results: get Rate (returns the book rate from the given user)
Query Params: userId (optional: if not defined it returns all rates)
**/
Router.get("/", ratesController.getRates);

/** 
POST 
Route: / 
Results: Create New Rate
**/
Router.post("/", ratesController.createRate);

/** 
DELETE 
Route: / 
Results: Delete Rate
**/
Router.delete("/:id", ratesController.deleteRate);

/** 
PUT 
Route: / 
Results: Update Rate
Query Params: userId

**/
Router.put("/", ratesController.updateRate);

module.exports = Router;
