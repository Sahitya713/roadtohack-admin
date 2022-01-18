const mongoose = require("mongoose");
const slugify = require("slugify");

const questionSchema = mongoose.Schema({
  hackCode: {
    type: String,
    required: [true, "A question must have a challenge code"],
    trim: true,
    minLength: [7, "challenge code can only be 7 characters"],
    maxLength: [7, "challenge code can only be 7 characters"],
  },
  question: {
    type: String,
    required: [true, " A question is required"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "A question needs a title"],
    trim: true,
  },
  location: {
    name: { type: String, unique: true },
    long: Number,
    lat: Number,
  },
  slug: String,
  image: String,
  points: {
    type: Number,
    required: [true, "A question needs points"],
  },
  questionType: {
    type: String,
    required: [true, "A question must have a questionType"],
    enum: {
      values: ["input", "mcq", "msq", "code"],
      message: "Question Type is either input, code, mcq or msq",
    },
  },
  rationale: String,
  sampleInput: [String],
  sampleOutput: [String],
  input: String,
  inputs: {
    type: [String],
    validate: {
      validator: function (val) {
        if (this.questionType === "input") {
          return val.length >= 1;
        }
        return true;
      },
      message: "An Input Question must have at least 1 input value",
    },
  },
  correctAnswers: {
    type: [String],
    validate: {
      validator: function (val) {
        return val.length === this.inputs.length;
      },
      message: "You need to provide the correct answers for each of the inputs",
    },
  },
  options: [
    {
      option: String,
      type: {
        type: String,
        enum: {
          values: ["text", "image"],
          message: "option type can either be an image or text",
        },
      },
      correct: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

// ensure that the title is unique for each challenge
questionSchema.index({ title: 1, hackCode: 1 }, { unique: true });
questionSchema.index({ slug: 1 });
// generate slug for title --> to be used for url
questionSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
