const Category = require('../models/category');
const factory = require('./handelers')



// @desc    Fetch all categories
// @route   GET /cats
// @access  Public
const getCategories = factory.getAll(Category)


// @desc    create a category
// @route   POST /cats
// @access  Private/Admin
const createCategory = factory.createOne(Category)


// @desc    Fetch a category
// @route   GET /cats/:id
// @access  Public
const getCategory = factory.getOne(Category)


// @desc    Update a category
// @route   PATCH /cats/:id
// @access  Private/Admin
const updateCategory = factory.updateOne(Category)
  

// @desc    Delete a category
// @route   DELETE /cats/:id
// @access  Private/Admin
const deleteCategory = factory.deleteOne(Category)

  


module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}