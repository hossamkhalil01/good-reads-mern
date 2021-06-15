const express = require("express");
const ratesController = require("../controllers/ratesController");
// init router
const Router = express.Router({ mergeParams: true });
const passport = require("passport");

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
Router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ratesController.createRate
);

/** 
DELETE 
Route: / 
Results: Delete Rate
**/
Router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ratesController.deleteRate
);

/** 
PUT 
Route: / 
Results: Update Rate
Query Params: userId

**/
Router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  ratesController.updateRate
);

module.exports = Router;
