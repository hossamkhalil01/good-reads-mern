const mongoose = require("mongoose");
const iDValidator = require("mongoose-id-validator");
const mongoosePaginate = require('mongoose-paginate-v2');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Book title is required",
    minLength: [3, "Title must be 3 chars at least"],
    maxLength: [30, "Title must not exceed 30 char"],
    trim: true,
    lowercase: true,
  },
  coverImage: {
    type: String,
    default: "default.png",
  },
  description: {
    type: String,
    default: "",
    trim: true,
    maxLength: [1000, "Description must not exceed 140 words"],
  },
  authors: [
    {
      type: "ObjectId",
      ref: "Author",
    },
  ],
  categories: [
    {
      type: "ObjectId",
      ref: "Category",
    },
  ],
});

// define unique index for title
bookSchema.index({ title: 1 }, { unique: true });

// Add ref id validator
bookSchema.plugin(iDValidator, {
  message: "Invalid reference , record not found",
});

// Add pagination plugin
bookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Book", bookSchema);
