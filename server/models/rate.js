const mongoose = require("mongoose");
const iDValidator = require("mongoose-id-validator");

bookRateSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: "Rating is required",
  },
  user: { type: "ObjectId", ref: "User" },
  book: { type: "ObjectId", ref: "Book" },
});

// add ref id validator
bookRateSchema.plugin(iDValidator, {
  message: "Invalid reference , record not found",
});

// define unique index for user and book
bookRateSchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model("BookRate", bookRateSchema);
