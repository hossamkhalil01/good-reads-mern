const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "First name is required",
    minLength: [2, "First name must be at least 3 chars"],
    maxLength: [25, "First name must not exceed 25 chars"],
    trim: true,
  },
  lastName: {
    required: "Last name is required",
    type: String,
    minLength: [2, "Last name must be at least 2 chars"],
    maxLength: [25, "Last name must not exceed 25 chars"],
    trim: true,
  },
  photo: {
    type: String,
    default: "default.png",
  },
  description: {
    type: String,
    default: "",
    trim: true,
    maxLength: [1000, "Description must not exceed 140 words"],
  },
  bDate: {
    type: Date,
    required: "Author's birthdate is required",
    max: "2003-12-30",
  },
});

// Define compound unique index for firstname + lastname
authorSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

// Add pagination plugin
authorSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Author", authorSchema);
