const Category = require("../models/category");
const { extractPaginationInfo } = require("../utils/pagination");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const getCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findOne({ _id: id });
    // category not found
    if (!category)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    return sendResponse(res, category, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return sendResponse(res, categories, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const manipulateSearchParams = (key) => {
  return { $regex: key };
};

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return sendResponse(res, category, statusCodes.success.created);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Category.findOneAndDelete({ _id: id });

    // category not found
    if (!category)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // deleted
    return sendResponse(res, category, statusCodes.success.noContent);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    // catrgory not found
    if (!updatedCategory)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // updated
    return sendResponse(res, updatedCategory, statusCodes.success.ok);
  } catch (error) {
    // invalid params
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = {
  getCategory,
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
