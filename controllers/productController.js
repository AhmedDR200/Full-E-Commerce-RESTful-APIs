const Product = require('../models/product');
const factory = require('./handelers')
const multer = require('multer')
const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new Error('Not an image! Please upload only images.'), false)
    }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });


const uploadProductImages = upload.fields([{
    name:"imageCover",
    maxCount:1,
},
{
    name:"images",
    maxCount:5,
}]);


const resizeProductImages = asyncHandler(async (req, res, next) => {
    // console.log(req.files);
    //1- Image processing for imageCover
    if (req.files.imageCover) {
      const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
  
      await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`uploads/products/${imageCoverFileName}`);
  
      // Save image into our db
      req.body.imageCover = imageCoverFileName;
    }
    //2- Image processing for images
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(
        req.files.images.map(async (img) => {
          const imageName = `product-${uuidv4()}-${Date.now()}.jpeg`;
  
          await sharp(img.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/products/${imageName}`);
  
          // Save image into our db
          req.body.images.push(imageName);
        })
      );
    }
    next();
});

// @desc    Fetch all products
// @route   GET /products
// @access  Public
const getProducts = factory.getAll(Product)


// @desc    Fetch single product
// @route   GET /products/:id
// @access  Public
const getProduct = factory.getOne(Product)


// @desc    Create a product
// @route   POST /products
// @access  Private/Admin
const createProduct = factory.createOne(Product)


// @desc    Update a product
// @route   PATCH /products/:id
// @access  Private/Admin
const updateProduct = factory.updateOne(Product)


// @desc    Delete a product
// @route   DELETE /products/:id
// @access  Private/Admin
const deleteProduct = factory.deleteOne(Product)


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages,
    resizeProductImages
};