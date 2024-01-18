const Category = require('../models/category');
const factory = require('./handelers')
const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const {uploadSingleImage} = require('../middlewares/uploadImages')
// const fs = require('fs');
// const path = require('path');

// // 1- Disk Storage for multer
// const uploadDir = '../uploads/categories';

// fs.mkdirSync(path.join(__dirname, uploadDir), { recursive: true });

// const multerStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, uploadDir))
//     },
//     filename: function (req, file, cb) {
//       const ext = file.mimetype.split('/')[1];  
//       const filename = `category-${uuidv4()}-${Date.now()}.${ext}`
//       cb(null, filename)
//     }
// });

// 2- Memory Storage for multer
// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//     if(file.mimetype.startsWith('image')){
//         cb(null, true)
//     }else{
//         cb(new Error('Not an image! Please upload only images.'), false)
//     }
// };
  
// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// Image upload
const uploadCategoryImage = uploadSingleImage("image");

// Image proccessing
const resizeCategoryImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
  .resize(600, 600)
  .toFormat('jpeg')
  .jpeg({ quality: 95})
  .toFile(`uploads/categories/${filename}`)

 // save the image to DataBase   
  req.body.image = filename;

  next();
});


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
    uploadCategoryImage,
    resizeCategoryImage
}