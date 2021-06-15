const Author = require("../models/author");
const { extractPaginationInfo } = require("../utils/pagination");

const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");
const multer = require("multer");
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myImage");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const getAuthor = async (req, res) => {
  const id = req.params.id;
  try {
    const author = await Author.findOne({ _id: id });
    // author not found
    if (!author)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    return sendResponse(res, author, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const getAuthors = async (req, res) => {
  // process the query params
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);

  if (filter.key) {
    filter["$or"] = manipulateSearchParams(filter.key);
    delete filter.key;
  }
  // the pagination options
  const options = {
    sort: { _id: -1 },
    lean: true,
    page,
    limit,
  };

  try {
    // get the authors
    const authors = await Author.paginate(filter, options);
    // build the resulting object
    return sendResponse(res, authors, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const manipulateSearchParams = (key) => {
  return [{ firstName: { $regex: key } }, { lastName: { $regex: key } }];
};

const createAuthor = (req, res) => {
  const body = JSON.parse(req.body.body);
  const firstName = body.firstName;
  const lastName = body.lastName;
  const description = body.description;
  const bDate = body.bDate;
  let photo = "public/img/authors/default.png";
  if (req.file) {
    photo = req.file.destination + req.file.filename;
  }

  const author = new Author({
    firstName,
    lastName,
    photo,
    description,
    bDate,
  });
  author
    .save()
    .then(() => {
      return sendResponse(res, author, statusCodes.success.created);
    })
    .catch((error) => {
      return sendError(res, error.message, statusCodes.error.invalidData);
    });
};

const deleteAuthor = async (req, res) => {
  const id = req.params.id;

  try {
    const author = await Author.findOneAndDelete({ _id: id });

    // author not found
    if (!author)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // deleted
    return sendResponse(res, author, statusCodes.success.noContent);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const updateAuthor = async (req, res) => {
  const id = req.params.id;
  let updates = JSON.parse(req.body.body);
  if (req.file) {
    const photo = req.file.destination + req.file.filename;
    updates.photo = photo;
  }
  try {
    const updatedAuthor = await Author.findOneAndUpdate({ _id: id }, updates, {
      new: true,
      runValidators: true,
    });

    // catrgory not found
    if (!updatedAuthor)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // updated
    return sendResponse(res, updatedAuthor, statusCodes.success.ok);
  } catch (error) {
    // invalid params
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = {
  getAuthor,
  getAuthors,
  createAuthor,
  deleteAuthor,
  updateAuthor,
};
