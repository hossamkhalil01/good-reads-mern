const express = require("express");
const authorsController = require("../controllers/authorsController");
// init router
const Router = express.Router();

const multer = require("multer");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/authors/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
// Init Upload
const upload = multer({
  storage: storage,
});


// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(file.originalname).toLowerCase();
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}


/** 
GET 
Route: /:id
Results: get Author
**/
Router.get("/:id", authorsController.getAuthor);

/** 
GET 
Route: / 
Results: All Authors
**/
Router.get("/", authorsController.getAuthors);

/** 
POST 
Route: / 
Results: Create New Author
**/
Router.post("/", upload.single("myImage"), authorsController.createAuthor);

/** 
DELETE 
Route: / 
Results: Delete Author
**/
Router.delete("/:id", authorsController.deleteAuthor);

/** 
PUT 
Route: / 
Results: Update Author
**/
Router.patch("/:id", upload.single("myImage"), authorsController.updateAuthor);

module.exports = Router;
