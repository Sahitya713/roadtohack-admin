const User = require("../models/userModel");
const Challenge = require("../models/challengeModel");
const Group = require("../models/groupModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// exports.getUser = factory.getOne(User);
// exports.createUser = factory.createOne(User);

// exports.validateUser = catchAsync(async (req, res, next) => {

// });
exports.getUser = catchAsync(async (req, res, next) => {
  console.log("get user function called");
  const doc = await User.findOne({ uid: req.params.id });

  if (!doc) {
    return next(new AppError(`User does not exist`, 404));
  }

  res.status(201).json({
    status: "success",
    data: doc,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { hackCode, group, email } = req.body;
  const challenge = await Challenge.find({ hackCode });

  if (!challenge) {
    return next(new AppError(`The challenge code ${hackCode} is invalid`, 404));
  }

  const groupDoc = await Group.findOne({ groupCode: group });
  console.log(groupDoc);
  if (!groupDoc) {
    return next(new AppError(`The group code ${group} is invalid`, 404));
  }

  // check that the email used to registered is correct and is in the group
  if (!groupDoc.members.includes(email)) {
    return next(
      new AppError(
        "Please use the email you have registered for this event with to sign up for an account.",
        404
      )
    );
  }
  req.body.group = groupDoc._id;
  console.log(req.body);
  const doc = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: doc,
  });
});
