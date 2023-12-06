const Category = require('../models/category');
const asyncHandler = require('express-async-handler');



// @desc    Fetch all categories
// @route   GET /cats
// @access  Public
const getCategories = asyncHandler(
    async (req, res) => {
    const categories = await Category
    .find()
    .select('-__v');

    res.json({
        status: 'success',
        results: categories.length,
        data: {categories}
    });
});


// @desc    create a category
// @route   POST /cats
// @access  Private/Admin
const createCategory = asyncHandler(
    async (req, res) => {
        const category = await Category.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {category}
        });
});



module.exports = {
    getCategories,
    createCategory
}