const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// @desc    Signup a User
// @route   POST /auth/signup
// @access  Public
exports.signup = asyncHandler(
    async(req, res, next) =>{
        // create user
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        // create token
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: process.env.JWT_EXPIRE_TIME}
        )

        res.status(201).json({
            status: 'success',
            data: user,
            token: token
        })
    }
);