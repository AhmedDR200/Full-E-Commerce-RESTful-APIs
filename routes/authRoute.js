const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');
const { signUpValidator } = require('../validators/authValidator');

router.route("/signup")
.post(signUpValidator, signup);

module.exports = router;
