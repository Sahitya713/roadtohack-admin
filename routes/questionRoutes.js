const express = require("express");
const questionController = require("../controllers/questionController");
const router = express.Router();

// - create qn
// - edit qn
// - delet qn
// - get all qns (id, name)
// - get qn by id

router
  .route("/")
  .post(
    questionController.manageQuestionFiles,
    questionController.createQuestion
  );

router
  .route("/:id")
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);
router
  .route("/get-questions/:hackCode")
  .get(questionController.getAllQuestionsByCode);

router.get("/download/:id", questionController.getDownloadUrl);
// router.route("/:id").get(userController.getChallengeByCode);
module.exports = router;
