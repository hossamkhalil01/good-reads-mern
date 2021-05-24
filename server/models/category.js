const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
// add Pagination package
categorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Category", categorySchema);
