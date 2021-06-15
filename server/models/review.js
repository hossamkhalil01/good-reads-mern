const mongoose = require("mongoose");
const iDValidator = require("mongoose-id-validator");
const mongoosePaginate = require('mongoose-paginate-v2');


reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: "Review is required",
    trim: true,
    minLength: [3, "Review must be at least 3 chars"],
    maxLength: [1000, "Review must not exceed 140 words"],
  },
  user: { type: "ObjectId", ref: "User" },
  book: { type: "ObjectId", ref: "Book" },
});

// add ref id validator
reviewSchema.plugin(iDValidator, {
  message: "Invalid reference , record not found",
});

// Add pagination plugin
reviewSchema.plugin(mongoosePaginate);

// define unique index for user and book
reviewSchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model("BookReview", reviewSchema);
