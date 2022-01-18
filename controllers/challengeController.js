const Challenge = require("../models/challengeModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllChallenges = factory.getAll(Challenge);
exports.createChallenge = factory.createOne(Challenge);

exports.getChallenge = factory.getOne(Challenge);

exports.getChallengeByCode = factory.getAllByCode(Challenge);
exports.updateChallenge = factory.updateOne(Challenge);
