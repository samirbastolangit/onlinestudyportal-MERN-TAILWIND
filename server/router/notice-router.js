const express = require("express"); 
const router = express.Router();

const adminMiddleware = require("../middleware/admin-middleware");
const authMiddleware = require("../middleware/auth-middleware");
const noticeController = require("../controller/notice-controller");

router.route("/admin/addnotice").post(authMiddleware,adminMiddleware, noticeController.addNotice);
// router.route("/admin/unotice/:id").put(authMiddleware,adminMiddleware, noticeController.updateNotice);
router.route("/admin/rnotice/:id").delete(authMiddleware,adminMiddleware, noticeController.removeNotice);
router.route("/").get(noticeController.getNotice);


module.exports = router;