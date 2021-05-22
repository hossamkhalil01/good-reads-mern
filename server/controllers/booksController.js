const Book = require("../models/book");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const getBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findOne({ _id: id })
      .populate("authors")
      .populate("categories");

    // book not found
    if (!book)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    return sendResponse(res, book, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const getBooks = async (req, res) => {
  const books = await Book.find().populate("authors").populate("categories");
  return sendResponse(res, books, statusCodes.success.ok);
};

const createBook = (req, res) => {
  const body = JSON.parse(req.body.body);

  const coverImage = req.file.destination + req.file.filename;
  console.log("cover Image ....",coverImage);
  const title = body.title;
  const authors = body.authors;
  const categories = body.categories;
  const description = body.description;
  Book.findOne({ title }).then((book) => {
    if (book) {
      return res.status(400).send({ err: "already exists" });
    } else {
     
      const book = new Book({
        title,
        authors,
        categories,
        coverImage,
        description,
      });
      book
        .save()
        .then(() => {
          return sendResponse(res, book, statusCodes.success.created)
        })
        .catch((e) => {
          console.log("e" , e);
          res.status(404).send({ msg: "error" });
        });
    }
  });
};
const deleteBook = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findOneAndDelete({ _id: id });

    // book not found
    if (!book)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // deleted
    return sendResponse(res, book, statusCodes.success.noContent);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const updateBook = async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  let updates = JSON.parse(req.body.body);
  if (req.file) {
    const coverPhoto = req.file.destination + req.file.filename;
    updates.coverImage = coverPhoto;
  }

  try {
    const updatedBook = await Book.findOneAndUpdate({ _id: id }, updates, {
      new: true,
      runValidators: true,
    })
      .populate("authors")
      .populate("categories");
    console.log(updatedBook);
    // catrgory not found
    if (!updatedBook)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // updated
    return sendResponse(res, updatedBook, statusCodes.success.ok);
  } catch (error) {
    // invalid params
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = {
  getBook,
  getBooks,
  createBook,
  deleteBook,
  updateBook,
};
