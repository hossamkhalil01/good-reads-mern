const Review = require("../models/review");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const getReviews = (req, res) => {
  const userId = req.query.userId;

  // if user was not provided
  if (!userId) return getAllReviews(req, res);

  return getUserReview(req, res, userId);
};

const getUserReview = async (req, res, userId) => {
  const bookId = req.params.bookId;
  try {
    const review = await Review.findOne({
      book: bookId,
      user: userId,
    }).populate("user");

    // review not found
    if (!review)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    return sendResponse(res, review, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const getAllReviews = async (req, res) => {
  const bookId = req.params.bookId;

  try {
    // get the reviews
    const reviews = await Review.find({ book: bookId }).populate("users");

    // build the resulting object
    return sendResponse(res, reviews, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.notFound);
  }
};

const createReview = async (req, res) => {
  try {
    const review = await Review.create({
      user: req.body.userId,
      book: req.params.bookId,
      review: req.body.review,
    });
    return sendResponse(res, review, statusCodes.success.created);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const deleteReview = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await Review.findOneAndDelete({ _id: id });

    // review not found
    if (!review)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // deleted
    return sendResponse(res, review, statusCodes.success.noContent);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const updateReview = async (req, res) => {
  const bookId = req.params.bookId;
  const userId = req.query.userId;
  const review = req.body.review;
  try {
    const updatedReview = await Review.findOneAndUpdate(
      { book: bookId, user: userId },
      { review },
      {
        new: true,
        runValidators: true,
      }
    );

    // review not found
    if (!updatedReview)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // updated
    return sendResponse(res, updatedReview, statusCodes.success.ok);
  } catch (error) {
    // invalid params
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
};
