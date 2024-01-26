const express = require('express');
const router = express.Router();
const { signup,
        login,
        forgotPassword,
        verifyPasswordCode,
        resetPassword } = require('../controllers/authController');
const { signUpValidator, logInValidator } = require('../validators/authValidator');

router.route("/signup")
.post(signUpValidator, signup);

router.route("/login")
.post(logInValidator, login)

router.route("/forgotPassword")
.post(forgotPassword)

router.route("/verifyResetCode")
.post(verifyPasswordCode)

router.route("/resetPassword")
.put(resetPassword);

module.exports = router;
