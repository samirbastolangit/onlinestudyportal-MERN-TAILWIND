const express = require("express")
const router = express.Router();
const adminDashboard = require("../controller/dashboard-controller");
const adminMiddleware = require("../middleware/admin-middleware");
const authmiddleware = require("../middleware/auth-middleware");

router.route("/admin/get").get(authmiddleware,adminMiddleware, adminDashboard);

module.exports = router;