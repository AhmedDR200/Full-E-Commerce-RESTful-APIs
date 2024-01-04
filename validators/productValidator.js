const { check } = require('express-validator');
const validetorMiddleware = require('../middlewares/validetorMiddleware');


const getProductValidator =  [
    check('id')
    .isMongoId()
    .withMessage('Invalid Product ID Provided !')
    ,validetorMiddleware
]


const createProductValidator = [
    check('title')
        .notEmpty()
        .withMessage('Product Title is Required !')
        .isLength({min:3, max:100})
        .withMessage('Product Title must be between 3 to 35 characters !'),
    check('description')
        .notEmpty()
        .withMessage('Product Description is Required !')
        .isLength({min:20, max:1000})
        .withMessage('Product Description must be between 3 to 200 characters !'),
    check('price')
        .notEmpty()
        .withMessage('Product Price is Required !')
        .isNumeric()
        .withMessage('Product Price must be a number !'),
    check('priceAfterDiscount')
        .optional()
        .isNumeric()
        .toFloat()
        .withMessage('Product Price must be a number !')
        .custom((value, { req }) => {
            if(req.body.price <= value) {
                throw new Error('Price After Discount must be less than Price !')
            }
            return true;
        }),   
    check('category')
        .notEmpty()
        .withMessage('Product Category is Required !')
        .isMongoId()
        .withMessage('Invalid Category ID Provided !'),
    check('images')
        .optional()
        .isArray()
        .withMessage('Product Images must be an array !'),
    check('colors')
        .optional()
        .isArray()
        .withMessage('Product Colors must be an array !'),
    check('brand')
        .notEmpty()
        .withMessage('Product Brand is Required !')
        .isMongoId()
        .withMessage('Invalid Brand ID Provided !')
    ,validetorMiddleware
]


const updateProductValidator = [
    check('title')
    .notEmpty()
    .withMessage('Product Title is Required !')
    .isLength({min:3, max:100})
    .withMessage('Product Title must be between 3 to 35 characters !')
    ,validetorMiddleware
]


const deleteProductValidator = [
    check('id')
    .isMongoId()
    .withMessage('Invalid Product ID Provided !')
    ,validetorMiddleware
]


module.exports = {
    getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator
};