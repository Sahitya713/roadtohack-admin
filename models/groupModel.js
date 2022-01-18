const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [20, "The group name must not be more than 20 characters"],
    trim: true,
  },
  image: {
    type: String,
  },
  hackCode: {
    type: String,
    required: [true, "A group must have a challenge code"],
    trim: true,
    minLength: [7, "challenge code can only be 7 characters"],
    maxLength: [7, "challenge code can only be 7 characters"],
  },
  groupCode: {
    type: String,
    required: [true, "A group must have a group code"],
    trim: true,
    minLength: [5, "challenge code can only be 5 characters"],
    maxLength: [5, "challenge code can only be 5 characters"],
    unique: true,
  },
  members: [String],
});
const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
