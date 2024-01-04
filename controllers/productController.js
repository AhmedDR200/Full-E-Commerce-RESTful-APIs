const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const ApiError = require('../utils/apiError');


// @desc    Fetch all products
// @route   GET /products
// @access  Public
const getProducts = asyncHandler(
    async (req, res) => {
        //Filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        // Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(queryObj);
        // Pagination
        const page = parseInt(req.query.page) || 1; // or * 1
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        // Building query
        let mogooseQuery = Product.find(JSON.parse(queryStr))
        .skip(skip)
        .limit(limit)
        .populate([
            { path: 'category', select: 'name' },
            { path: 'subcategories', select: 'name'},
            { path: 'brand', select: 'name' }
        ]);
        // Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            mogooseQuery = mogooseQuery.sort(sortBy);
        }
        else {
            mogooseQuery = mogooseQuery.sort('-createdAt');
        };
        // Field limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            mogooseQuery = mogooseQuery.select(fields);
        }
        else {
            mogooseQuery = mogooseQuery.select('-__v');
        };
        // Executing query
        const products = await mogooseQuery;

        res.json({
            status: 'success',
            results: products.length,
            page,
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