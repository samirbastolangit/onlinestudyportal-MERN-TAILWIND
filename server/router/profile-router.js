const express = require("express");
const router = express.Router();

const upload = require("../config/multerConfig");

const controller = require("../controller/profile-controller");

const authmiddleware = require("../middleware/auth-middleware");

router.route("/add").put(
        authmiddleware,
        upload.single("profileImage"),
        controller.createOrUpdateProfile
);
router.route("/readmyprofile").get(authmiddleware, controller.getProfile);

module.exports = router;