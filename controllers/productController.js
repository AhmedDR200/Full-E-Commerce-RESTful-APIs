const Product = require('../models/product');
const factory = require('./handelers')


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
    deleteProduct
};