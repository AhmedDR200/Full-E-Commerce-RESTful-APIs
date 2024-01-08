const { check, body } = require('express-validator');
const validetorMiddleware = require('../middlewares/validetorMiddleware');
const slugify = require('slugify');


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
    .custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    })
    ,validetorMiddleware
]


const updateCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage('Category Name is Required !')
    .isLength({min:3, max:35})
    .withMessage('Category Name must be between 3 to 35 characters !'),
    body('name')
    .optional()
    .custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    })
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