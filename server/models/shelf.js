const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const iDValidator = require("mongoose-id-validator");

// shelf schema 
shelfSchema = new mongoose.Schema({
    book: {
        type: "ObjectId",
        ref: "Book",
        required: "Book is required",

    },
    user: {
        type: "ObjectId",
        ref: "User",
        required: "User is required",

    },

    status: {
        type: String,
        enum: ["Read", "Currently Reading", "Want To Read"],
        default: "Want To Read",
    }
});



// define unique index for book and user combination
shelfSchema.index({ book: 1 }, { user: true });


// add ref id validator
shelfSchema.plugin(iDValidator, {
    message: "Invalid reference , record not found",
});

// Add pagination plugin
shelfSchema.plugin(mongoosePaginate);


module.exports = mongoose.model("Shelf", shelfSchema);
