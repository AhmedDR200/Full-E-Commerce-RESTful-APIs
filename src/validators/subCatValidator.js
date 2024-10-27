const { check, body } = require('express-validator');
const validetorMiddleware = require('../middlewares/validetorMiddleware');
const slugify = require('slugify');


const getSubCategoryValidator =  [
    check('id')
    .isMongoId()
    .withMessage('Invalid SubCategory ID Provided !')
    ,validetorMiddleware
]


const createSubCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage('SubCategory Name is Required !')
    .isLength({min:2, max:35})
    .withMessage('SubCategory Name must be between 2 to 35 characters !')
    .custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    })
    ,validetorMiddleware
]


const updateSubCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage('SubCategory Name is Required !')
    .isLength({min:2, max:35})
    .withMessage('SubCategory Name must be between 2 to 35 characters !'),
    body('name')
    .optional()
    .custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    })
    ,validetorMiddleware
]


const deleteSubCategoryValidator = [
    check('id')
    .isMongoId()
    .withMessage('Invalid SubCategory ID Provided !')
    ,validetorMiddleware
]



module.exports = {
    getSubCategoryValidator,
    createSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator
};