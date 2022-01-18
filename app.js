const path = require("path");
const express = require("express");
const enforce = require("express-sslify");

const app = express();

const rateLimit = require("express-rate-limit");
const compression = require("compression");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const challengeRouter = require("./routes/challengeRoutes");
const userRouter = require("./routes/userRoutes");
const groupRouter = require("./routes/groupRoutes");
const questionRouter = require("./routes/questionRoutes");
const answerRouter = require("./routes/answerRoutes");

// const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// to trust heroku
app.enable("trust proxy");

// LIMIT REQUESTS FROM SAME IP
// allow 100 requests from same IP in 1 hour
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);

// BODY PARSER. Reading data from body into req.body
app.use(express.json());
// reading data from form
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "client/build")));
}

// compresses the json text responses, images etc should alr be compressed
app.use(compression());

app.use("/api/v1/challenge", challengeRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/group", groupRouter);
app.use("/api/v1/question", questionRouter);
app.use("/api/v1/answer", answerRouter);

if (process.env.NODE_ENV === "production") {
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.all("*", (req, res, next) => {
  // skips all other middleware in the stack and goes straight to error handling middleware
  // any param in next() is assumed to be an error
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);
module.exports = app;
