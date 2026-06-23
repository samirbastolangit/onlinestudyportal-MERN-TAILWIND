const express = require("express")
const router = express.Router();
const controller = require("../controller/course-controller");
const adminMiddleware = require("../middleware/admin-middleware");
const authmiddleware = require("../middleware/auth-middleware");

const upload = require("../config/multerConfig");
const validateImageResolution = require("../middleware/image-validation");


router.route("/admin/pcourses").post(authmiddleware, adminMiddleware, upload.single("courseThumbnail"),validateImageResolution, controller.addCourses);

router.route("/admin/ucourses/:id").put(authmiddleware,adminMiddleware,
        upload.single("courseThumbnail"),
        validateImageResolution,
        controller.updateCourses);
router.route("/admin/rcourses/:id").delete(authmiddleware,adminMiddleware,controller.deleteCourses);
router.route("/admin/rfeed/:id").delete(authmiddleware,adminMiddleware, controller.removefeedmessage);

router.route("/").get(controller.listCourses);
router.route("/addfeed").post(authmiddleware, controller.addfeedmessage);
router.route("/viewfeed").get(controller.viewfeedmessage);


module.exports = router;