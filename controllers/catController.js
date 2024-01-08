const Category = require('../models/category');
const factory = require('./handelers')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const uploadDir = '../uploads/categories';

fs.mkdirSync(path.join(__dirname, uploadDir), { recursive: true });

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, uploadDir))
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split('/')[1];  
      const filename = `category-${uuidv4()}-${Date.now()}.${ext}`
      cb(null, filename)
    }
});
  
const upload = multer({ storage: multerStorage });

// Image upload
const uploadCategoryImage = upload.single("image");


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
    deleteCategory,
    uploadCategoryImage
}