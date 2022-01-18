const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  uid: String,
  displayName: {
    type: String,
    required: true,
    maxLength: [20, "The display name must not be more than 20 characters"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "A user profile must have an email address"],
  },
  // group: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Group",
  //   required: [true, "A user must belong to a group"],
  // },
  group: {
    type: String,
    required: [true, "A user must belong to a group"],
  },
  hackCode: {
    type: String,
    required: [true, "A user must have a challenge code"],
    trim: true,
    minLength: [7, "challenge code can only be 7 characters"],
    maxLength: [7, "challenge code can only be 7 characters"],
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
