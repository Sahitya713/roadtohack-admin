const multer = require("multer");

var ObjectId = require("mongodb").ObjectID;

const Question = require("../models/questionModel");
const Answer = require("../models/answerModel");
const User = require("../models/userModel");
const Group = require("../models/groupModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const awsManager = require("../utils/awsManager");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
exports.manageCodeFile = multer({ storage }).single("userCode");

exports.createAnswer = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const question = await Question.findById(req.body.question);
  // const user = await User.findById(req.body.user);
  const answer = await Answer.findOne({
    question: req.body.question,
    user: req.body.user,
  });

  if (!question) {
    return next(
      new AppError("no question associated with this answer is found", 404)
    );
  }

  if (question.questionType == "input") {
    // upload code if there is no prev qn or there is a change to file
    if (req.file) {
      const name = question.title.split(" ").join("_");

      const codeLocation = await awsManager.uploadFile(
        req.file,
        "User-Code",
        name
      );
      console.log(codeLocation);

      req.body.userCode = codeLocation.Location;
    } else if (!answer) {
      return next(
        new AppError("No prevous solution found but no code submitted", 401)
      );
    } else {
      req.body.userCode = answer.userCode;
    }

    req.body.isAnswerCorrect = true;
    var score = 0;

    var userAnswers = JSON.parse(req.body.userAnswers);

    const answers = userAnswers.map((ans, idx) => {
      var answerObject = {};
      answerObject["userAnswer"] = ans;
      answerObject["correct"] = true;
      const ansU = ans.split(",");
      const ansA = question.correctAnswers[idx].split(",");
      if (ansU.length !== ansA.length) {
        answerObject["correct"] = false;
        req.body.isAnswerCorrect = false;
      } else {
        for (let i = 0; i < ansU.length; i++) {
          if (ansU[i].trim() != ansA[i].trim()) {
            answerObject["correct"] = false;
            req.body.isAnswerCorrect = false;
            break;
          }
        }
      }
      if (answerObject["correct"]) {
        score += 1;
      }
      return answerObject;
    });

    // calculate score for this qn
    const ratio = score / answers.length;
    req.body.score = Math.round(question.points * ratio);
    req.body.userAnswers = answers;
  } else if (question.questionType === "code") {
    // upload code if there is no prev qn or there is a change to file
    if (req.file) {
      const name = question.title.split(" ").join("_");

      const codeLocation = await awsManager.uploadFile(
        req.file,
        "User-Code",
        name
      );
      console.log(codeLocation);

      req.body.userCode = codeLocation.Location;
    } else if (!answer) {
      return next(
        new AppError("No prevous solution found but no code submitted", 401)
      );
    } else {
      req.body.userCode = answer.userCode;
    }
    req.body.score = 0;
  } else {
    req.body.isAnswerCorrect = true;
    selectedOptions = JSON.parse(req.body.selectedOptions);
    const answers = question.options.map(({ _id, option, correct }) => {
      var answerObject = {};
      answerObject["_id"] = _id;
      answerObject["option"] = option;
      answerObject["actual"] = correct;
      const userAnswer = selectedOptions.includes(option);
      answerObject["userAnswer"] = userAnswer;
      if (correct != userAnswer) {
        req.body.isAnswerCorrect = false;
      }
      return answerObject;
    });
    req.body.userOptions = answers;
    req.body.score = req.body.isAnswerCorrect ? question.points : 0;
  }

  console.log(req.body);
  if (answer) {
    await Answer.findByIdAndDelete(answer._id);
  }
  let doc = await Answer.create(req.body);

  doc = await doc
    .populate({
      path: "user",
      select: "group",
    })
    .execPopulate();
  res.status(201).json({
    status: "success",
    data: doc,
  });
});

exports.getAllAnswers = factory.getAll(Answer);

exports.updateScore = catchAsync(async (req, res, next) => {
  var answer = await Answer.findById(req.params.id);
  if (!answer) {
    return next(
      new AppError("no Answer associated with this id is found", 404)
    );
  }
  answer = await answer
    .populate({
      path: "question",
      select: "points",
    })
    .execPopulate();

  const score = req.body.score;
  // check that the score given is not negative and is not above the quesion max points
  if (score < 0 || score > answer.question.points) {
    return next(
      new AppError(
        "The score allocated to an answer cannot be negative or more than the maximum points allocated to that question",
        401
      )
    );
  }

  const doc = await Answer.findByIdAndUpdate(
    req.params.id,
    { score: score },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.getAllAnswersByQuestion = catchAsync(async (req, res, next) => {
  console.log(req.params.questionId);
  let doc = await Answer.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },

    {
      $match: {
        question: new ObjectId(req.params.questionId),
      },
    },

    {
      $project: {
        isAnswerCorrect: 1,
        userOptions: 1,
        group: "$user.group",
        user: "$user.displayName",
        // question: 1,
        // question: { points: 1, _id: 1, slug: 1 },
        userAnswers: 1,
        userCode: 1,
        score: 1,
        comment: 1,
      },
    },
  ]);
  doc = await Promise.all(
    doc.map(async (e) => {
      // const group = e.group;
      // console.log(e);
      var docuObject = {};
      docuObject = e;
      var grp = await Group.findById(e.group);
      docuObject["groupName"] = grp.name;
      console.log(docuObject);
      return docuObject;
    })
  );

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: doc,
  });
});

exports.getAllAnswersByGroup = catchAsync(async (req, res, next) => {
  let doc = await Answer.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "question",
        foreignField: "_id",
        as: "question",
      },
    },
    { $unwind: "$user" },
    { $unwind: "$question" },
    {
      $match: {
        "user.group": req.params.groupId,
      },
    },
    {
      $project: {
        isAnswerCorrect: 1,
        userOptions: 1,
        user: "$user.displayName",
        question: { points: 1, _id: 1, slug: 1, questionType: 1, title: 1 },
        userAnswers: 1,
        userCode: 1,
        score: 1,
        comment: 1,
      },
    },
  ]);

  //   if (popOptions) query = query.populate(popOptions);

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: doc,
  });
});
// exports.getQuestion = factory.getOne(Question);

// get the group scores to display on grp page
exports.getGroupAnswers = catchAsync(async (req, res, next) => {
  // let doc = await Answer.find({ "user.group": req.params.groupId });
  // console.log(req.params.groupId);
  let doc = await Answer.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "question",
        foreignField: "_id",
        as: "question",
      },
    },
    { $unwind: "$user" },
    { $unwind: "$question" },
    {
      $match: {
        "user.group": req.params.groupId,
        // isAnswerCorrect: true,
      },
    },

    {
      $project: {
        // isAnswerCorrect: 1,
        displayName: "$user.displayName",
        userId: "$user._id",
        // user: { _id: 1, group: 1 },
        question: {
          // points: 1,
          hackCode: 1,
          _id: 1,
          slug: 1,
          title: 1,
          location: 1,
        },
        score: 1,
        // userAnswer: 1,
        // userCode: 1,
      },
    },
    {
      $group: {
        _id: "$userId",
        displayName: { $first: "$displayName" },
        totalPoints: { $sum: "$score" },
        questions: {
          $push: {
            title: "$question.title",
            points: "$score",
            location: "$question.location",
          },
        },
      },
    },
    {
      $sort: { totalPoints: -1 },
    },
  ]);

  //   if (popOptions) query = query.populate(popOptions);

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: doc,
  });
});

exports.getLeaderBoard = catchAsync(async (req, res, next) => {
  // let doc = await Answer.find({ "user.group": req.params.groupId });
  // console.log(req.params.groupId);
  let doc = await Answer.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "question",
        foreignField: "_id",
        as: "question",
      },
    },
    { $unwind: "$user" },
    { $unwind: "$question" },
    // {
    //   $match: {
    //     isAnswerCorrect: true,
    //   },
    // },
    {
      $project: {
        score: 1,
        groupObj: { $toObjectId: "$user.group" },
        question: {
          title: 1,
          // points: 1,
        },
      },
    },
    {
      $lookup: {
        from: "groups",
        localField: "groupObj",
        foreignField: "_id",
        as: "group",
      },
    },
    { $unwind: "$group" },
    {
      $match: {
        "group.hackCode": req.params.hackCode,
      },
    },
    {
      $group: {
        _id: "$groupObj",
        group: { $first: "$group" },
        totalPoints: { $sum: "$score" },
      },
    },
    {
      $sort: { totalPoints: -1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: doc,
  });
});

// download code files
exports.getCodeDownloadUrl = catchAsync(async (req, res) => {
  const answer = await Answer.findById(req.params.id);
  const fileUrl = answer.userCode;
  //   Input-Files/53d782e3-14c5-47e8-84aa-2fb6f324f0d7.py

  const urlElems = fileUrl.split("/");
  const filename = urlElems.pop();

  const key = `User-Code/${filename}`;

  const downloadUrl = awsManager.getDownloadUrl(key);

  res.status(200).json({
    status: "success",
    data: downloadUrl,
  });
});
