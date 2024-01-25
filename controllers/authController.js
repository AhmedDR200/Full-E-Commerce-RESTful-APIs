const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const createToken = (payload) =>{
    jwt.sign(
        {userId: payload},
        process.env.JWT_SECRET_KEY,
        {expiresIn: process.env.JWT_EXPIRE_TIME}
    )
}

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
        const token = createToken(user._id)

        res.status(201).json({
            status: 'success',
            data: user,
            token: token
        })
    }
);


// @desc    login a User
// @route   POST /auth/login
// @access  Public
exports.login = asyncHandler(
    async(req, res, next) => {
        // check email & password in body
        const user = await User.findOne({email: req.body.email});
        const passwordCompare = await bcrypt.compare(req.body.password, user.password)
        if(!user || !passwordCompare){
            return next(new ApiError("Invalid Email or Password !", 410))
        }
        // create token
        const token = createToken(user._id)

        res.status(200).json({
            status: 'success',
            data: user,
            token: token
        })
    }
)