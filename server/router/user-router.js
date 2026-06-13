const express = require("express");
const authmiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const userController = require("../controller/user-controller");
const controller = require("../controller/auth-controller");
 
const router = express.Router();

router.route("/admin/users").get(authmiddleware,adminMiddleware,userController.getallusers);
router.route("/admin/deleteuserac/:id").delete(authmiddleware,adminMiddleware,userController.deleteuserac);
router.route("/").get(authmiddleware , controller.user);
router.route("/deletemyac").delete(authmiddleware , userController.deletemyac);
router.route("/updatemyac").put(authmiddleware , userController.updatemyac);

module.exports = router;
