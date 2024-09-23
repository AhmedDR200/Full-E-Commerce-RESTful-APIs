const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  signUpValidator,
  logInValidator,
} = require("../validators/authValidator");

router.post("/signup", signUpValidator, authController.signup);
router.post("/login", logInValidator, authController.login);
router.post(
  "/forgotpassword",
  authController.forgotPassword
);
router.post("/verifyOTP", authController.verifyPasswordCode);
router.put("/resetpassword", authController.resetPassword);
router.post("/refresh", authController.refreshToken);

module.exports = router;
