const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogsRouter = require("./controllers/blogsController");
const usersRouter = require("./controllers/usersController");
const loginRouter = require("./controllers/loginController");

const middleware = require("./utils/middleware");
const config = require("./utils/config");

const app = express();

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.tokenExtractor);

// your routes here
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", require("./controllers/testingController"));
}

module.exports = app;
