const { check } = require('express-validator');
const validetorMiddleware = require('../middlewares/validetorMiddleware');


const getCategoryValidator =  [
    check('id')
    .isMongoId()
    .withMessage('Invalid Category ID Provided !')
    ,validetorMiddleware
]


const createCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage('Category Name is Required !')
    .isLength({min:3, max:35})
    .withMessage('Category Name must be between 3 to 35 characters !')
    ,validetorMiddleware
]


const updateCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage('Category Name is Required !')
    .isLength({min:3, max:35})
    .withMessage('Category Name must be between 3 to 35 characters !')
    ,validetorMiddleware
]


const deleteCategoryValidator = [
    check('id')
    .isMongoId()
    .withMessage('Invalid Category ID Provided !')
    ,validetorMiddleware
]





module.exports = {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
};