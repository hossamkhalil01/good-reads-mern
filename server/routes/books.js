const express = require("express");
const booksController = require("../controllers/booksController");
const rateRouter = require("../routes/rates");
const reviewRouter = require("../routes/reviews");
const passport = require("passport");

const path = require("path");
const multer = require("multer");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/books/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// Init Upload
const upload = multer({
  storage: storage,
});

// Check File Type
function checkFileType(file, cb) {
  console.log("check file: ", file);
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(file.originalname).toLowerCase();
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// init router
const Router = express.Router();

// add rate sub routes
Router.use("/:bookId/rates", rateRouter);

// add review sub routes
Router.use("/:bookId/reviews", reviewRouter);

/** 
GET 
Route: /:id
Results: get Book
**/
Router.get("/:id", booksController.getBook);

/** 
GET 
Route: / 
Results: All Books
Query Params: catgoryId (optional: if not defined it returns all books)
**/
Router.get("/", booksController.getBooks);

/** 
POST 
Route: / 
Results: Create New Book
**/
Router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("myImage"),
  booksController.createBook
);

/** 
DELETE 
Route: / 
Results: Delete Book
**/
Router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  booksController.deleteBook
);

/** 
PUT 
Route: / 
Results: Update Book
**/
Router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("myImage"),
  booksController.updateBook
);

Router.get("/authorBooks/:authorId", booksController.getBooksByAuthor);

module.exports = Router;
