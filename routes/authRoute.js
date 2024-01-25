const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { signUpValidator, logInValidator } = require('../validators/authValidator');

router.route("/signup")
.post(signUpValidator, signup);

router.route("/login")
.post(logInValidator, login)

module.exports = router;
