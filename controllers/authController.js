const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');
const createToken = require('../utils/createToken')


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

// @desc    Forgot Password
// @route   POST /auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(
    async(req, res, next) => {
        // get user by email
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return next(new ApiError(`There is no user with that email ${req.body.email}`, 404))
        }
        //if user exist, generate reset random 6 digits and save it in db
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        // hash the code
        const hashedResetCode = crypto
        .createHash('sha256')
        .update(resetCode)
        .digest('hex');
        // save hashed code to db
        user.passwordResetCode = hashedResetCode;
        // expire time => 10 min
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
        user.passwordResetVerified = false;
        await user.save();

        // send email
        const message =`Hi ${user.name},

        We've received a request to reset the password for your E-shop Account.
        Here is your reset code: ${resetCode}
        
        To complete the reset, simply enter this code on the reset page.
        
        Thanks a bunch for helping us maintain the security of your account!
        
        Best regards,
        The DEVLANT Team`;

        try{
            await sendEmail({
                email: user.email,
                subject: "Your password reset code (Valid for 10 min)",
                message: message,
            });
        }
        catch(er){
            user.passwordResetCode = undefined;
            user.passwordResetExpires = undefined;
            user.passwordResetVerified = undefined;

            await user.save();
            return next(new ApiError("There is an Error in sending Email", 500))
        }


        res.status(200).json({
            status:"success",
            message: `Reset Code Sent to this Email: ${user.email}`
        })
    }
);

// @desc    Verify Password Code
// @route   POST /auth/verifyPasswordCode
// @access  Public
exports.verifyPasswordCode = asyncHandler(
    async(req, res, next) => {
        // get user based on reset code
        const hashedResetCode = crypto
        .createHash('sha256')
        .update(req.body.resetCode)
        .digest('hex');

        const user = await User.findOne({
            passwordResetCode: hashedResetCode,
            passwordResetExpires: {$gt: Date.now()},
        });
        if (!user) {
            return next(new ApiError("Reset Code Invalid or Expired"))
        }
        // reset code valid
        user.passwordResetVerified = true;
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Reset Code is Verified'
        })
    }
)

// @desc    Reset Password
// @route   POST /auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(
    async(req, res, next) => {
        // get user based on email
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return next(new ApiError(`There is no user with email ${req.body.email}`, 400));
        }
        // check if reset code is verifed
        if(!user.passwordResetVerified){
            return next(new ApiError(`Reset code not verifed`, 404));
        }

        user.password = req.body.newPassword;

        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetVerified = undefined;

        await user.save();

        // generate new token ater all is ok
        const token = createToken(user._id);

        res.status(200).json({
            status: 'success',
            message: 'Password reset Successfully',
            token: token
        })
    }
);