const express = require("express");
const reviewsController = require("../controllers/reviewsController");
// init router
const Router = express.Router({ mergeParams: true });
const passport = require("passport");

/** 
GET 
Route: /
Results: get Reviews (returns the book reviews from the given user)
Query Params: userId (optional: if not defined it returns all reviews)
**/
Router.get("/", reviewsController.getReviews);

/** 
POST 
Route: / 
Results: Create New Review
**/
Router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  reviewsController.createReview
);

/** 
DELETE 
Route: / 
Results: Delete Review
**/
Router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  reviewsController.deleteReview
);

/** 
PUT 
Route: /:id
Results: Update Review
Query Params: userId

**/
Router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  reviewsController.updateReview
);

module.exports = Router;
