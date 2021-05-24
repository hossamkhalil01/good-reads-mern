const authorModel = require("../models/author");
const bookModel = require("../models/book");
const categoryModel = require("../models/category");
const { statusCodes, sendResponse, sendError } = require("../utils/responses");

const getFilterdData = async (req, res) => {
  try {
    const searchKey = req.query?.q;
    const promises = [
      authorModel
        .find({
          $or: [
            { firstName: { $regex: searchKey } },
            { lastName: { $regex: searchKey } },
          ],
        })
        .limit(3)
        .sort("firstName lastName"),
      bookModel
        .find({ title: { $regex: searchKey } })
        .select("-authors -categories")
        .limit(3)
        .sort("title"),
    ];
    const [matchedAuthors, matchedBooks] = await Promise.all(promises);
    return sendResponse(
      res,
      { matchedAuthors, matchedBooks },
      statusCodes.success.ok
    );
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};
module.exports = { getFilterdData };
