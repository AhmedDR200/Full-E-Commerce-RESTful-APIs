const { check, body } = require('express-validator');
const validetorMiddleware = require('../middlewares/validetorMiddleware');
const slugify = require('slugify');
const User = require('../models/user');


exports.signUpValidator = [
    check('name')
    .notEmpty()
    .withMessage('User Name is Required !')
    .isLength({min:3, max:35})
    .withMessage('User Name must be between 3 to 35 characters !')
    .custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    }),

    check('email')
    .notEmpty()
    .withMessage('User Email is Required !')
    .isEmail()
    .withMessage('Invalid Email Provided !')
    .custom((val) => User.findOne({email: val}).then(user =>{
        if(user){
            return Promise.reject('Email Already in Use !')
        }
    })),

    check('password')
    .notEmpty()
    .withMessage('User Password is Required !')
    .isLength({min:6})
    .withMessage('User Password must be at least 6 characters !')
    .custom((password, {req}) => {
        if(password !== req.body.passwordConfirm){
            throw new Error('User Password Confirm must be the same as Password !')
        }
        return true;
    }),

    check('passwordConfirm')
    .notEmpty()
    .withMessage('User Password Confirm is Required !')

    ,validetorMiddleware
]