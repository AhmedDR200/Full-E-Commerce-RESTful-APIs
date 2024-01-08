const Brand = require('../models/brand');
const factory = require('./handelers')



// @desc    Fetch all brands
// @route   GET /brands
// @access  Public
const getBrands = factory.getAll(Brand)


// @desc    create a brand
// @route   POST /brands
// @access  Private/Admin
const createBrand = factory.createOne(Brand)


// @desc    Fetch a brand
// @route   GET /brands/:id
// @access  Public
const getBrand = factory.getOne(Brand)


// @desc    Update a brand
// @route   PUT /brands/:id
// @access  Private/Admin
const updateBrand = factory.updateOne(Brand)


// @desc    Delete a brand
// @route   DELETE /brands/:id
const deleteBrand = factory.deleteOne(Brand)


module.exports = {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand
}