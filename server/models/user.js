const Schema = require("mongoose").Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ],
    trim: true,
  },
  firstName: {
    type: String,
    required: "First name is required",
    minLength: [3, "First name must be at least 3 chars"],
    maxLength: [10, "First name must not exceed 10 chars"],
    trim: true,
  },
  lastName: {
    required: "Last name is required",
    type: String,
    minLength: [3, "Last name must be at least 3 chars"],
    maxLength: [10, "Last name must not exceed 10 chars"],
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: "Password is required",
  },

  avatar: {
    type: String,
    default: "default.png",
  },

  shelf: [
    {
      book: {
        type: "ObjectId",
        ref: "Book",
      },
      status: {
        type: String,
        enum: ["Read", "Currently Reading", "Want To Read"],
        default: "Want To Read",
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
