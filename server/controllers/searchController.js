const authorModel = require("../models/author");
const bookModel = require("../models/book");
const categoryModel = require("../models/category");
const { statusCodes, sendResponse, sendError } = require("../utils/responses");

const getFilterdData = async (req, res) => {
  try {
    const searchKey = req.query?.q;
    const promises = [
      authorModel.find({
        $or: [
          { firstName: { $regex: searchKey } },
          { lastName: { $regex: searchKey } },
        ],
      }),
      bookModel
        .find({ title: { $regex: searchKey } })
        .select("-authors -categories"),
      categoryModel.find({
        label: { $regex: searchKey },
      }),
    ];
    const [matchedAuthors, matchedBooks, matchedCategories] = await Promise.all(
      promises
    );
    return sendResponse(
      res,
      { matchedAuthors, matchedBooks, matchedCategories },
      statusCodes.success.ok
    );
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};
module.exports = { getFilterdData };
