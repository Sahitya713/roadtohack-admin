const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/").post(userController.createUser);
router.route("/:id").get(userController.getUser);
// router.route("/:id").get(userController.getChallengeByCode);
module.exports = router;
