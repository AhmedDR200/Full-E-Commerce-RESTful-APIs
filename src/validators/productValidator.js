const { check, body } = require('express-validator');
const validetorMiddleware = require('../middlewares/validetorMiddleware');
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');
const slugify = require('slugify');


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
        .withMessage('Product Title must be between 3 to 35 characters !')
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),
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
        .withMessage('Invalid Category ID Provided !')
        .custom((category) => 
            Category.findById(category).then(category => {
                if(!category) {
                    return Promise.reject(
                        new Error(`Category Not Found For This ID: ${category} !`)
                    );
                }
            })),
    check('subcategories')
        .optional()
        .isArray()
        .withMessage('Product SubCategories must be an array !')
        .custom((subcategories) => 
            SubCategory.find({_id: {$exists: true, $in: subcategories}}).then(
                (result) => {
                if(result.length < 1 || result.length !== subcategories.length) {
                    return Promise.reject(
                        new Error(`SubCategories Not Found For This IDs: ${subcategories} !`)
                    );
                }
            }))
        .custom((val, { req }) => SubCategory.find({category: req.body.category}).then((subcategories)=>{
            const subcategoriesIds = [];
            subcategories.forEach((subcategory) => {
                subcategoriesIds.push(subcategory._id.toString());
            });
            // check if subcategories ids in subcategoriesIds array
            const checker = val.every((value) => subcategoriesIds.includes(value));
            if(!checker) {
                return Promise.reject(
                    new Error(`SubCategories Not Found For This IDs: ${val} !`)
                );
            }
        })),        
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
    .withMessage('Product Title must be between 3 to 35 characters !'),
    body('title')
        .optional()
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        })
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