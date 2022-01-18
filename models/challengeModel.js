const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
  hackCode: {
    type: String,
    required: [true, "A challenge must have a challenge code"],
    unique: true,
    trim: true,
    minLength: [7, "challenge code can only be 7 characters"],
    maxLength: [7, "challenge code can only be 7 characters"],
  },
  title: {
    type: String,
    required: [true, "A challenge must have a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "A challenge must have a description"],
    trim: true,
  },
  startTime: {
    type: Date,
    required: [true, "A Challenge must have a start time"],
    default: Date.now(),
  },
  endTime: {
    type: Date,
    required: [true, "A Challenge must have an end Time"],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A challenge must be created by a user"],
  },
});

const Challenge = mongoose.model("Challenge", challengeSchema);
module.exports = Challenge;
