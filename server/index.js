require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const configs = require("./configs");

const app = express();

// get the enviornment configs
const ENV = process.env.NODE_ENV || "dev";
const { DB_URI, PORT } = configs[ENV];

// connect to DB
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, (err) => {
      if (err) return console.log(err);

      return console.log("Server started on port: " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// add middlewares
app.use(express.json());
app.use(cors());

// add resources routers
app.use("/users", require("./routes/users"));
app.use("/books", require("./routes/books"));
app.use("/categories", require("./routes/categories"));
app.use("/authors", require("./routes/authors"));
