const express = require("express");
const groupController = require("../controllers/groupController");
const router = express.Router();

router
  .route("/")
  .post(groupController.manageGrpImage, groupController.createGroup);

router.route("/get-groups/:hackCode").get(groupController.getAllGroupsByCode);
router
  .route("/:id")
  .get(groupController.getGroup)
  .patch(groupController.manageGrpImage, groupController.updateGroup)
  .delete(groupController.deleteGroup);
// router.route("/:id").get(userController.getChallengeByCode);
module.exports = router;
