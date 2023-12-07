const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const ApiError = require('../utils/apiError');



// @desc    Fetch all categories
// @route   GET /cats
// @access  Public
const getCategories = asyncHandler(
    async (req, res) => {
        const page = parseInt(req.query.page) || 1; // or * 1
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const categories = await Category
        .find().skip(skip).limit(limit)
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
        category.slug = slugify(category.name).toLowerCase();
        await category.save();

        res.status(201).json({
            status: 'success',
            data: {category}
        });
});


// @desc    Fetch a category
// @route   GET /cats/:id
// @access  Public
const getCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const category = await Category.findById(id);
  
    if (!category) {
      return next(new ApiError(`No category found with that ID: ${id}`, 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: { category },
    });
});


// @desc    Update a category
// @route   PATCH /cats/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    const category = await Category.findByIdAndUpdate(
        {_id: id},
        { name, slug: slugify(name).toLowerCase() },
        { new: true, runValidators: true }
    );

    if (!category) {
      return next(new ApiError(`No category found with that ID: ${id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {category}
    });
});
  

// @desc    Delete a category
// @route   DELETE /cats/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const category = await Category.findByIdAndDelete(id);
  
    if (!category) {
      return next(new ApiError(`No category found with that ID: ${id}`, 404));
    }
  
    res.status(204).json({
      status: 'success',
      message: 'Category deleted successfully',
    });
});

  


module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}