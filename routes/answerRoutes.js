const express = require("express");
const answerController = require("../controllers/answerController");
const router = express.Router();

router
  .route("/")
  .post(answerController.manageCodeFile, answerController.createAnswer)
  .get(answerController.getAllAnswers);

router.route("/update-score/:id").patch(answerController.updateScore);

router
  .route("/get-group-answers/:groupId")
  .get(answerController.getAllAnswersByGroup);

router
  .route("/get-question-answers/:questionId")
  .get(answerController.getAllAnswersByQuestion);

router
  .route("/get-group-scores/:groupId")
  .get(answerController.getGroupAnswers);

router.route("/get-leaderboard/:hackCode").get(answerController.getLeaderBoard);

router.get("/download-code/:id", answerController.getCodeDownloadUrl);
module.exports = router;
