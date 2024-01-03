const Brand = require('../models/brand');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const ApiError = require('../utils/apiError');



// @desc    Fetch all brands
// @route   GET /brands
// @access  Public
const getBrands = asyncHandler(
    async (req, res) => {
        const page = parseInt(req.query.page) || 1; // or * 1
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const brands = await Brand
        .find().skip(skip).limit(limit)

        res.json({
            status: 'success',
            results: brands.length,
            data: {brands}
        });
});


// @desc    create a brand
// @route   POST /brands
// @access  Private/Admin
const createBrand = asyncHandler(
    async (req, res) => {
        const brand = await Brand.create(req.body);
        brand.slug = slugify(brand.name).toLowerCase();
        await brand.save();

        res.status(201).json({
            status: 'success',
            data: {brand}
        });
});


// @desc    Fetch a brand
// @route   GET /brands/:id
// @access  Public
const getBrand = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const brand = await Brand.findById(id);
  
    if (!brand) {
      return next(new ApiError(`No brand found with that ID: ${id}`, 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: { brand },
    });
});


// @desc    Update a brand
// @route   PUT /brands/:id
// @access  Private/Admin
const updateBrand = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    const brand = await Brand.findByIdAndUpdate(
        {_id: id},
        { name, slug: slugify(name).toLowerCase() },
        { new: true, runValidators: true }
    );

    if (!brand) {
      return next(new ApiError(`No category found with that ID: ${id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {brand}
    });
});


// @desc    Delete a brand
// @route   DELETE /brands/:id
const deleteBrand = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {
      return next(new ApiError(`No brand found with that ID: ${id}`, 404));
    }

    res.status(204).json({
        status: 'success',
        message: 'brand deleted successfully'
    });
});


module.exports = {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand
}