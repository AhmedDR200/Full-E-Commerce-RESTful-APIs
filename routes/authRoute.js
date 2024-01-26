const express = require('express');
const router = express.Router();
const { signup,
        login,
        forgotPassword,
        verifyPasswordCode } = require('../controllers/authController');
const { signUpValidator, logInValidator } = require('../validators/authValidator');

router.route("/signup")
.post(signUpValidator, signup);

router.route("/login")
.post(logInValidator, login)

router.route("/forgotPassword")
.post(forgotPassword)

router.route("/verifyResetCode")
.post(verifyPasswordCode)

module.exports = router;
