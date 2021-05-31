const express = require("express");
const usersController = require("../controllers/usersController");
const shelfBooksRouter = require("./shelf");
const path = require("path");
const multer = require("multer");
const passport = require("passport");

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/img/avatars/");
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

/** 
GET 
Route: /:id
Results: get User
**/
Router.get("/:id", usersController.getUser);

/** 
GET 
Route: / 
Results: All Users
**/
Router.get("/", usersController.getUsers);

/** 
POST 
Route: / 
Results: Create New User
**/
Router.post("/", usersController.createUser);

/** 
DELETE 
Route: / 
Results: delete User
**/
Router.delete("/:id", usersController.deleteUser);

/** 
PUT 
Route: / 
Results: Update User
**/
Router.patch("/:id",
 passport.authenticate("jwt", { session: false }),
upload.single("myImage"),
usersController.updateUser);

module.exports = Router;
