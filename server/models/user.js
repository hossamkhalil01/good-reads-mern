const mongoose = require("mongoose");
const passwordHash = require("../middlewares/passwordHash");
const iDValidator = require("mongoose-id-validator");
const mongoosePaginate = require('mongoose-paginate-v2');


// create shelf schema
const createShelfSchema = () => {
  // create shelf schema 
  shelfSchema = new mongoose.Schema({
    book: {
      type: "ObjectId",
      ref: "Book",

    },
    status: {
      type: String,
      enum: ["Read", "Currently Reading", "Want To Read"],
      default: "Want To Read",
    }
  }, { _id: false });


  // add ref id validator
  shelfSchema.plugin(iDValidator, {
    message: "Invalid reference , record not found",
  });

  // Add pagination plugin
  shelfSchema.plugin(mongoosePaginate);

  return shelfSchema;
}




// create user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
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
    maxLength: [25, "First name must not exceed 25 chars"],
    trim: true,
  },
  lastName: {
    required: "Last name is required",
    type: String,
    minLength: [3, "Last name must be at least 3 chars"],
    maxLength: [25, "Last name must not exceed 25 chars"],
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

  shelf: [createShelfSchema()],
});

// define unique index for email
userSchema.index({ email: 1 }, { unique: true });

// apply password hash hook
userSchema.pre("save", passwordHash);

// Add pagination plugin
userSchema.plugin(mongoosePaginate);

// add ref id validator
userSchema.plugin(iDValidator, {
  message: "Invalid reference , record not found",
});


module.exports = mongoose.model("User", userSchema);
