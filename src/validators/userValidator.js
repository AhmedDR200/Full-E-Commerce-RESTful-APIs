const { check, body } = require('express-validator');
const validetorMiddleware = require('../middlewares/validetorMiddleware');
const slugify = require('slugify');
const User = require('../models/user');
const bcrypt = require('bcryptjs')


const getUserValidator =  [
    check('id')
    .isMongoId()
    .withMessage('Invalid User ID Provided !')
    ,validetorMiddleware
]


const createUserValidator = [
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
    .withMessage('User Password Confirm is Required !'),

    check('profileImg')
    .optional(),

    check('role')
    .notEmpty()
    .withMessage('User Role is Required !')
    .isIn(['admin', 'user'])
    .withMessage('Invalid User Role Provided !'),

    check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Invalid Phone Number Provided !, only accept Egy and SA phones numbers')

    ,validetorMiddleware
]


const updateUserValidator = [
    check('name')
    .notEmpty()
    .withMessage('User Name is Required !')
    .isLength({min:3, max:35})
    .withMessage('User Name must be between 3 to 35 characters !'),
    body('name')
    .optional()
    .custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    })
    ,validetorMiddleware
]


const changePasswordValidator = [
    check('id')
    .isMongoId()
    .withMessage('Invalid User ID Provided !'),

    check("currentPassword")
    .notEmpty()
    .withMessage("You must set yout current password !"),

    check("passwordConfirm")
    .notEmpty()
    .withMessage("You must put the password confirm !"),

    check("password")
    .notEmpty()
    .withMessage("You must enter new password !")
    .custom(async(val, {req}) => {
        // verify current password
        const user = await User.findById(req.params.id);
        if(!user){
            throw new Error("There is no user for this id")
        }
        const isCorrectPassword = bcrypt.compare(
            req.body.currentPassword,
            user.password
        );
        if(!isCorrectPassword){
            throw new Error("Incorrect current password !")
        }
        // verify password confirm
        if(val !== req.body.passwordConfirm){
            throw new Error("Invalid Password Confirmtion !")
        }
        return true;
    })
    ,validetorMiddleware
]


const deleteUserValidator = [
    check('id')
    .isMongoId()
    .withMessage('Invalid User ID Provided !')
    ,validetorMiddleware
]


const updateLoggedUserValidator = [
    check('name')
    .notEmpty()
    .withMessage('User Name is Required !')
    .isLength({min:3, max:35})
    .withMessage('User Name must be between 3 to 35 characters !'),
    body('name')
    .optional()
    .custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    }),

    check("email")
    // .notEmpty()
    // .withMessage("Email Required")
    // .isEmail()
    // .withMessage("Invalid Email Address")
    .custom((val) => User.findOne({email: val}).then(user =>{
        if(user){
            return Promise.reject('Email Already in Use !')
        }
    })),

    check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Invalid Phone Number Provided !, only accept Egy and SA phones numbers')

    ,validetorMiddleware
]

module.exports = {
    getUserValidator,
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changePasswordValidator,
    updateLoggedUserValidator
}
