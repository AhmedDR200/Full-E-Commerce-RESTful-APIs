const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const ApiError = require('../utils/apiError');


// @desc    Fetch all products
// @route   GET /products
// @access  Public
const getProducts = asyncHandler(
    async (req, res) => {
        const page = parseInt(req.query.page) || 1; // or * 1
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const products = await Product.find()
        .skip(skip)
        .limit(limit)
        .populate([
            { path: 'category', select: 'name' },
            { path: 'subcategory', select: 'name'},
            { path: 'brand', select: 'name' }
        ]);

        res.json({
            status: 'success',
            results: products.length,
            data: {products}
        });
});


// @desc    Fetch single product
// @route   GET /products/:id
// @access  Public
const getProduct = asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const product = await Product.findById(id);

        if(!product){
            return next(new ApiError('Product not found', 404));
        }

        res.json({
            status: 'success',
            data: {product}
        });
});


// @desc    Create a product
// @route   POST /products
// @access  Private/Admin
const createProduct = asyncHandler(
    async (req, res) => {
        req.body.slug = slugify(req.body.title);
        const product = await Product.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {product}
        });
});


// @desc    Update a product
// @route   PATCH /products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        req.body.slug = slugify(req.body.title);

        const product = await Product.findOneAndUpdate({_id: id }, req.body,{ new: true});

        if(!product){
            return next(new ApiError('Product not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {product}
        });
});


// @desc    Delete a product
// @route   DELETE /products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return next(new ApiError('Product not found', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
});


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};