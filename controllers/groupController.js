const multer = require("multer");

const Group = require("../models/groupModel");
const User = require("../models/userModel");
const factory = require("./handlerFactory");

const awsManager = require("../utils/awsManager");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllGroups = factory.getAll(Group);
exports.deleteGroup = factory.deleteOne(Group);
// exports.getGroup = factory.getOne(Group);
exports.getAllGroupsByCode = factory.getAllByCode(Group);

exports.getGroup = catchAsync(async (req, res, next) => {
  let doc = await Group.findById(req.params.id);
  // const doc = await query;

  if (!doc) {
    return next(
      new AppError(`no document found with the ID ${req.params.id}`, 404)
    );
  }

  let members = await User.find({ group: req.params.id });

  members = members.map((mem) => mem.displayName);
  doc["members"] = members;

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

exports.manageGrpImage = multer({ storage }).single("image");
// const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/appError");

exports.createGroup = catchAsync(async (req, res, next) => {
  // const imageLocation = await awsManager.uploadFile(req.file, "Group-Image");
  // req.body.image = imageLocation.Location;

  try {
    req.body.members = JSON.parse(req.body.members);
  } catch (error) {
    return next(new AppError("A cumpulsory field members is not given", 401));
  }

  //  create a random 5 character code for the group
  //   65-90 incl
  // 97 -122 incl
  // 48-57 incl

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  var rndInts = [];
  for (var i = 0; i < 5; i++) {
    const rndInt = randomIntFromInterval(65, 90);
    rndInts.push(rndInt);
  }
  req.body.groupCode = String.fromCharCode(
    rndInts[0],
    rndInts[1],
    rndInts[2],
    rndInts[3],
    rndInts[4]
  );

  req.body.image =
    "https://roadtohack.s3.ap-southeast-1.amazonaws.com/grpicon.png";

  const doc = await Group.create(req.body);
  res.status(201).json({
    status: "success",
    data: doc,
  });
});

// exports.createGroup = factory.createOne(Group);

// exports.updateGroup = factory.updateOne(Group);

exports.updateGroup = catchAsync(async (req, res, next) => {
  if (req.file) {
    const imageLocation = await awsManager.uploadFile(req.file, "Group-Image");
    req.body.image = imageLocation.Location;
  }
  if (req.body.members) {
    req.body.members = JSON.parse(req.body.members);
  }

  const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!group) {
    return next(
      new AppError(`no document found with the ID ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: group,
  });
});
