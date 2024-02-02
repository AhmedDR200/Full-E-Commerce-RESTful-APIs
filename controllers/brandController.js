const Brand = require('../models/brand');
const factory = require('./handelers');
const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const {uploadSingleImage} = require('../middlewares/uploadImages')

// Image upload
const uploadBrandImage = uploadSingleImage("image");


const resizeBrandImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
  .resize(600, 600)
  .toFormat('jpeg')
  .jpeg({ quality: 95})
  .toFile(`uploads/brands/${filename}`)

 // save the image to DataBase   
  req.body.image = filename;

  next();
});


// @desc    Fetch all brands
// @route   GET /brands
// @access  Public
const getBrands = factory.getAll(Brand, 'Brand')


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
    deleteBrand,
    uploadBrandImage,
    resizeBrandImage
};