const express = require("express");
const router = express.Router();
const controller = require("../controller/profile-controller");

const authmiddleware = require("../middleware/auth-middleware");

router.route("/add").post(authmiddleware, controller.createOrUpdateProfile);
router.route("/readmyprofile").get(authmiddleware, controller.getProfile);

module.exports = router;