require("dotenv").config();

const config = {
  dev: {
    DB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/good-books",

    PORT: process.env.PORT || 8000,
  },

  prod: {},
};

module.exports = config;
