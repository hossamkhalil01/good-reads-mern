const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, "Category label is required"],
    minLength: [1, "Label must be 1 chars at least"],
    maxLength: [20, "Label must not exceed 20 char"],
    trim: true,
    lowercase: true,
  },
});

// define unique index for labewl
categorySchema.index({ label: 1 }, { unique: true });

module.exports = mongoose.model("Category", categorySchema);
