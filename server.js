const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const app = require("./app");

// handle errors in synchronous code
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// dotenv.config({ path: path.resolve(__dirname, "config.env") });
// if (process.env.NODE_ENV !== "production") {
//   //   require("dotenv").config();
//   dotenv.config({ path: "./config.env" });
// }

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// if using local database
// const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB successfully connected!"));
// console.log(process.env);

const port = process.env.PORT || 5000;

const server = app.listen(port, (error) => {
  if (error) throw error;
  console.log(`App listening on port ${port}...`);
});

// errors in asynchronous code
// NOTE: this is more of a safety net. you should still have error handling closer to where the error actually occurs
// i.e. catch blocks
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);

  // graceful shutting down, close teh server first then process.exit
  // usually u would need a mechanism to restart the system when app crashes for an actual app
  // most hosting platforms have this alr
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
