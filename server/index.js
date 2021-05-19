require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const configs = require("./configs");
const passport = require("passport");

const app = express();

// get the enviornment configs
const ENV = process.env.NODE_ENV || "dev";
const { DB_URI, PORT } = configs[ENV];

// connect to DB
mongoose
  .connect(DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
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
require("./utils/passport")(passport);

app.use(passport.initialize());

// add resources routers
app.use("/authentication", require("./routes/authentication"));
app.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  require("./routes/users")
);
app.use(
  "/books",
  passport.authenticate("jwt", { session: false }),
  require("./routes/books")
);
app.use(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  require("./routes/categories")
);
app.use(
  "/authors",
  passport.authenticate("jwt", { session: false }),
  require("./routes/authors")
);
