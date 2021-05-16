const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    unique: true,
    required: [true, "Category label is required"],
    minLength: [3, "Label must be 3 chars at least"],
    maxLength: [10, "Label must not exceed 10 char"],
    trim: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
