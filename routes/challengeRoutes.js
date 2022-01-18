const express = require("express");
const challengeController = require("../controllers/challengeController");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();

router
  .route("/")
  .get(challengeController.getAllChallenges)
  .post(challengeController.createChallenge);
router.route("/:id").patch(challengeController.updateChallenge);

router.route("/:hackCode").get(challengeController.getChallengeByCode);
module.exports = router;
