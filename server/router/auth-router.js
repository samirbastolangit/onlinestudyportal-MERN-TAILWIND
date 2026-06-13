const express = require("express");
const router = express.Router();
const controller = require("../controller/auth-controller");
const authvalidateMiddleware = require("../middleware/authvalidate-middleware");
const authValidatorSchema = require("../validators/auth-validators");
const loginValidateSchema = require("../validators/login-validators");

router.route("/register").post(authvalidateMiddleware(authValidatorSchema) ,controller.register);
router.route("/login").post(authvalidateMiddleware(loginValidateSchema), controller.login);

module.exports = router;