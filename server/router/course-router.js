const express = require("express")
const router = express.Router();
const controller = require("../controller/course-controller");
const adminMiddleware = require("../middleware/admin-middleware");
const authmiddleware = require("../middleware/auth-middleware");

router.route("/admin/pcourses").post(authmiddleware,adminMiddleware,controller.addCourses);
router.route("/admin/ucourses/:id").put(authmiddleware,adminMiddleware,controller.updateCourses);
router.route("/admin/rcourses/:id").delete(authmiddleware,adminMiddleware,controller.deleteCourses);
router.route("/admin/rfeed/:id").delete(authmiddleware,adminMiddleware, controller.removefeedmessage);

router.route("/").get(controller.listCourses);
router.route("/addfeed").post(authmiddleware, controller.addfeedmessage);
router.route("/viewfeed").get(controller.viewfeedmessage);


module.exports = router;