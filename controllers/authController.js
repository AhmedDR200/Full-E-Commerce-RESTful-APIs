const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const createToken = (payload) => {
    return jwt.sign(
        { userId: payload },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE_TIME }
    );
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


exports.protect = asyncHandler(
    async(req, res, next) =>{
        // check if token exist
        let token;
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ){
            token = req.headers.authorization.split(" ")[1];
            console.log(token);
        }
        if(!token){
            return next(new ApiError("You are not login, Please login to get access this route", 401))
        }
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decoded);
        // check id user exist
        const currentUser = await User.findById(decoded.userId);
        if(!currentUser){
            return next(new ApiError("The User that belong to this token does no longer exist", 401))
        }
        // check if the user change password after token creation
        if (currentUser.passwordChangedAt) {
            const passwordChangedTime = parseInt(currentUser.passwordChangedAt.getTime() /1000,10);
            // Password changed after token created(Error)
            if (passwordChangedTime > decoded.iat) {
                return next(new ApiError("User recntly changed his password, please login again...", 401))
            }
        }
        req.user = currentUser;
        next();
    }
);


exports.allowedTo =(...roles) => asyncHandler(
    async(req, res, next) => {
        // Access Roles
        if (!roles.includes(req.user.role)) {
            return next(new ApiError("You are not allowed to access this route", 403))
        }
        next();
    }
)