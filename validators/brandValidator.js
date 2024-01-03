const { check } = require('express-validator');
const validetorMiddleware = require('../middlewares/validetorMiddleware');


const getBrandValidator =  [
    check('id')
    .isMongoId()
    .withMessage('Invalid Brand ID Provided !')
    ,validetorMiddleware
]


const createBrandValidator = [
    check('name')
    .notEmpty()
    .withMessage('Brand Name is Required !')
    .isLength({min:3, max:35})
    .withMessage('Brand Name must be between 3 to 35 characters !')
    ,validetorMiddleware
]


const updateBrandValidator = [
    check('name')
    .notEmpty()
    .withMessage('Brand Name is Required !')
    .isLength({min:3, max:35})
    .withMessage('Brand Name must be between 3 to 35 characters !')
    ,validetorMiddleware
]


const deleteBrandValidator = [
    check('id')
    .isMongoId()
    .withMessage('Invalid Brand ID Provided !')
    ,validetorMiddleware
]


module.exports = {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator
}
