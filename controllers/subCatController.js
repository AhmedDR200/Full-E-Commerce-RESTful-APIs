const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const SubCategory = require('../models/subCategory');



// @desc    Fetch all subCategories
// @route   GET /subCats
// @access  Public
const getSubCategories = asyncHandler(
    async (req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page - 1) * limit;

        const SubCategories = await SubCategory.find()
        .skip(skip)
        .limit(limit)
        .populate('category', 'name');

        res.json({
            status: 'success',
            results: SubCategories.length,
            data: {SubCategories}
        });
});


// @desc    create a subCategory
// @route   POST /subCats
// @access  Private/Admin
const createSubCategory = asyncHandler(
    async (req, res) => {
        const subCategory = await SubCategory.create(req.body);
        subCategory.slug = slugify(subCategory.name).toLowerCase();
        await subCategory.save();

        res.status(201).json({
            status: 'success',
            data: {subCategory}
        });
});


// @desc    Fetch a subCategory
// @route   GET /subCats/:id
// @access  Public
const getSubCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const subCategory = await SubCategory.findById(id)
      .populate('category', 'name');
  
    if (!subCategory) {
      return next(new ApiError(`No subCategory found with that ID: ${id}`, 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: { subCategory },
    });
});


// @desc    Update a subCategory
// @route   PUT /subCats/:id
// @access  Private/Admin
const updateSubCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const subCategory = await SubCategory.findById(id)
    .populate('category', 'name');
  
    if (!subCategory) {
      return next(new ApiError(`No subCategory found with that ID: ${id}`, 404));
    }
  
    subCategory.name = req.body.name || subCategory.name;
    subCategory.slug = slugify(subCategory.name).toLowerCase();
    subCategory.category = req.body.category || subCategory.category;
  
    await subCategory.save();
  
    res.status(200).json({
      status: 'success',
      data: { subCategory },
    });
});


// @desc    Delete a subCategory
// @route   DELETE /subCats/:id
// @access  Private/Admin
const deleteSubCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const subCategory = await SubCategory.findById(id);
  
    if (!subCategory) {
      return next(new ApiError(`No subCategory found with that ID: ${id}`, 404));
    }
  
    await subCategory.remove();
  
    res.status(204).json({
      status: 'success',
      data: null,
    });
});


module.exports = {
    getSubCategories,
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
};