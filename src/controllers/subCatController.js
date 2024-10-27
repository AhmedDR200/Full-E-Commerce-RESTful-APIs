const SubCategory = require('../models/subCategory');
const factory = require('./handelers')


// @desc    Fetch all subCategories for Specific Category
// @route   GET /:catId/subCats
// @desc    Fetch all subCategories
// @route   GET /subCats
// @access  Public
const getSubCategories = factory.getAll(SubCategory, 'SubCategory')


// Middleware to set category id to body
const setCatIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.catId;
  next();
};

// @desc    create a subCategory
// @route   POST /subCats
// @access  Private/Admin
const createSubCategory = factory.createOne(SubCategory)


// @desc    Fetch a subCategory
// @route   GET /subCats/:id
// @access  Public
const getSubCategory = factory.getOne(SubCategory)


// @desc    Update a subCategory
// @route   PUT /subCats/:id
// @access  Private/Admin
const updateSubCategory = factory.updateOne(SubCategory)


// @desc    Delete a subCategory
// @route   DELETE /subCats/:id
// @access  Private/Admin
const deleteSubCategory = factory.deleteOne(SubCategory)


// Exporting
module.exports = {
    getSubCategories,
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    setCatIdToBody
};