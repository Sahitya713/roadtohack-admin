const multer = require("multer");
const Question = require("../models/questionModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const awsManager = require("../utils/awsManager");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

exports.manageInputFile = multer({ storage }).single("input");
exports.manageQuestionFiles = multer({ storage }).fields([
  { name: "image", maxCount: 1 },
  { name: "input", maxCount: 1 },
  { name: "option1", maxCount: 1 },
  { name: "option2", maxCount: 1 },
  { name: "option3", maxCount: 1 },
  { name: "option4", maxCount: 1 },
]);

exports.createQuestion = catchAsync(async (req, res, next) => {
  console.log(req.body);
  req.body.location = JSON.parse(req.body.location);

  const name = req.body.title.split(" ").join("_");
  if (req.files.image) {
    const imageLocation = await awsManager.uploadFile(
      req.files.image[0],
      "Images",
      name
    );
    req.body.image = imageLocation.Location;
  }

  if (req.body.questionType === "code") {
    try {
      const inputLocation = await awsManager.uploadFile(
        req.files.input[0],
        "Input-Files",
        name
      );
      req.body.input = inputLocation.Location;
    } catch (error) {
      console.log(error);
      return next(new AppError(`a cumpulsory field is not given`, 401));
    }
  } else if (req.body.questionType === "input") {
    try {
      req.body.sampleInput = JSON.parse(req.body.sampleInput);
      req.body.sampleOutput = JSON.parse(req.body.sampleOutput);
      req.body.inputs = JSON.parse(req.body.inputs);
      req.body.correctAnswers = JSON.parse(req.body.correctAnswers);
    } catch (error) {
      return next(new AppError(`a cumpulsory field is not given`, 401));
    }
  } else {
    try {
      req.body.correctOptions = JSON.parse(req.body.correctOptions);

      var options = [];
      var option_one = {};
      if (req.files.option1) {
        const option1Location = await awsManager.uploadFile(
          req.files.option1[0],
          "Options",
          `${name}_option_1`
        );
        option_one["option"] = option1Location.Location;
        option_one["type"] = "image";
        option_one["correct"] = req.body.correctOptions.includes("option1");
      } else {
        option_one["option"] = req.body.option1;
        option_one["type"] = "text";
        option_one["correct"] = req.body.correctOptions.includes("option1");
      }
      options.push(option_one);

      var option_two = {};
      if (req.files.option2) {
        const option1Location = await awsManager.uploadFile(
          req.files.option2[0],
          "Options",
          `${name}_option_2`
        );
        option_two["option"] = option2Location.Location;
        option_two["type"] = "image";
        option_two["correct"] = req.body.correctOptions.includes("option2");
      } else {
        option_two["option"] = req.body.option2;
        option_two["type"] = "text";
        option_two["correct"] = req.body.correctOptions.includes("option2");
      }
      options.push(option_two);

      var option_three = {};
      if (req.files.option3) {
        const option3Location = await awsManager.uploadFile(
          req.files.option3[0],
          "Options",
          `${name}_option_3`
        );
        option_three["option"] = option3Location.Location;
        option_three["type"] = "image";
        option_three["correct"] = req.body.correctOptions.includes("option3");
      } else {
        option_three["option"] = req.body.option3;
        option_three["type"] = "text";
        option_three["correct"] = req.body.correctOptions.includes("option3");
      }
      options.push(option_three);

      var option_four = {};
      if (req.files.option4) {
        const option4Location = await awsManager.uploadFile(
          req.files.option4[0],
          "Options",
          `${name}_option_4`
        );
        option_four["option"] = option4Location.Location;
        option_four["type"] = "image";
        option_four["correct"] = req.body.correctOptions.includes("option4");
      } else {
        option_four["option"] = req.body.option4;
        option_four["type"] = "text";
        option_four["correct"] = req.body.correctOptions.includes("option4");
      }
      options.push(option_four);
      req.body.options = options;

      // req.body.options = JSON.parse(req.body.options);
    } catch (error) {
      return next(new AppError(`a cumpulsory field is not given`, 401));
    }
  }

  const doc = await Question.create(req.body);
  res.status(201).json({
    status: "success",
    data: doc,
  });
});

// const getOptions = async (name, , files) => {
//   var options = [];
//   var option_one = {};
//   if (req.files.option1) {
//     const option1Location = await awsManager.uploadFile(
//       req.files.option1[0],
//       "Options",
//       `${name}_option_1`
//     );
//     option_one["option"] = option1Location.Location;
//     option_one["type"] = "image";
//     option_one["correct"] = "option1" in req.body.correctOptions;
//   } else {
//     option_one["option"] = req.body.option1;
//     option_one["type"] = "text";
//     option_one["correct"] = "option1" in req.body.correctOptions;
//   }
//   options.push(option_one);

//   var option_two = {};
//   if (req.files.option2) {
//     const option1Location = await awsManager.uploadFile(
//       req.files.option2[0],
//       "Options",
//       `${name}_option_2`
//     );
//     option_two["option"] = option2Location.Location;
//     option_two["type"] = "image";
//     option_two["correct"] = "option2" in req.body.correctOptions;
//   } else {
//     option_two["option"] = req.body.option2;
//     option_two["type"] = "text";
//     option_two["correct"] = "option2" in req.body.correctOptions;
//   }
//   options.push(option_two);

//   var option_three = {};
//   if (req.files.option3) {
//     const option3Location = await awsManager.uploadFile(
//       req.files.option3[0],
//       "Options",
//       `${name}_option_3`
//     );
//     option_three["option"] = option3Location.Location;
//     option_three["type"] = "image";
//     option_three["correct"] = "option3" in req.body.correctOptions;
//   } else {
//     option_three["option"] = req.body.option3;
//     option_three["type"] = "text";
//     option_three["correct"] = "option3" in req.body.correctOptions;
//   }
//   options.push(option_three);

//   var option_four = {};
//   if (req.files.option4) {
//     const option4Location = await awsManager.uploadFile(
//       req.files.option4[0],
//       "Options",
//       `${name}_option_1`
//     );
//     option_four["option"] = option4Location.Location;
//     option_four["type"] = "image";
//     option_four["correct"] = "option4" in req.body.correctOptions;
//   } else {
//     option_four["option"] = req.body.option4;
//     option_four["type"] = "text";
//     option_four["correct"] = "option4" in req.body.correctOptions;
//   }
//   options.push(option_four);
//   return options;
// };
exports.getAllQuestions = factory.getAll(Question);

exports.getAllQuestionsByCode = factory.getAllByCode(Question);

// download input files
exports.getDownloadUrl = catchAsync(async (req, res) => {
  const question = await Question.findById(req.params.id);
  const fileUrl = question.input;
  //   Input-Files/53d782e3-14c5-47e8-84aa-2fb6f324f0d7.py

  const urlElems = fileUrl.split("/");
  var filename = urlElems.pop();
  console.log(filename);
  console.log(typeof filename);
  filename = filename.replace(/%20/g, " ");
  console.log(filename);

  const key = `Input-Files/${filename}`;

  const downloadUrl = awsManager.getDownloadUrl(key);

  res.status(200).json({
    status: "success",
    data: downloadUrl,
  });
});

// - create qn
// - edit qn
// - delet qn//
// - get all qns (id, name)
// - get qn by id

exports.updateQuestion = catchAsync(async (req, res) => {});
exports.deleteQuestion = factory.deleteOne(Question);
// exports.getQuestion = factory.getOne(Question);
