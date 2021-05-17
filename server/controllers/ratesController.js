const Rate = require("../models/rate");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const { mapId } = require("../utils/mongoose");

const getRates = (req, res) => {
  const userId = req.query.userId;

  // if user was not provided
  if (!userId) return getAllRates(req, res);

  return getUserRate(req, res, userId);
};

const getUserRate = async (req, res, userId) => {
  const bookId = req.params.bookId;
  try {
    const rate = await Rate.findOne({ book: bookId, user: userId });

    // rate not found
    if (!rate)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    return sendResponse(res, rate, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const getAllRates = async (req, res) => {
  const bookId = mapId(req.params.bookId);
  // get the ratings
  const rates = await Rate.find({ book: bookId }).populate("users");

  // get the average and total number of ratings
  const [{ avg, count }] = await Rate.aggregate([
    {
      $match: {
        book: bookId,
      },
    },
    {
      $group: {
        _id: "$book",
        avg: {
          $avg: "$rating",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  // build the resulting object
  return sendResponse(res, { rates, avg, count }, statusCodes.success.ok);
};

const createRate = async (req, res) => {
  try {
    const rate = await Rate.create({
      user: req.body.userId,
      book: req.params.bookId,
      rating: req.body.rating,
    });
    return sendResponse(res, rate, statusCodes.success.created);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const deleteRate = async (req, res) => {
  const id = req.params.id;

  try {
    const rate = await Rate.findOneAndDelete({ _id: id });

    // rate not found
    if (!rate)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // deleted
    return sendResponse(res, rate, statusCodes.success.noContent);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const updateRate = async (req, res) => {
  const bookId = req.params.bookId;
  const userId = req.query.userId;
  const updates = req.body;
  try {
    const updatedRate = await Rate.findOneAndUpdate(
      { book: bookId, user: userId },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    // catrgory not found
    if (!updatedRate)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // updated
    return sendResponse(res, updatedRate, statusCodes.success.ok);
  } catch (error) {
    // invalid params
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = {
  getRates,
  createRate,
  deleteRate,
  updateRate,
};
