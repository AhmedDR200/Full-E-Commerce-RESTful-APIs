const Product = require("../models/product");
const factory = require("./handelers");
const asyncHandler = require("express-async-handler");

// @desc    Fetch all products
// @route   GET /products
// @access  Public
const getProducts = factory.getAll(Product, "Product");

// @desc    Fetch single product
// @route   GET /products/:id
// @access  Public
const getProduct = factory.getOne(Product, "reviews");

// @desc    Create a product
// @route   POST /products
// @access  Private/Admin
const createProduct = factory.createOne(Product);

// @desc    Update a product
// @route   PATCH /products/:id
// @access  Private/Admin
const updateProduct = factory.updateOne(Product);

// @desc    Delete a product
// @route   DELETE /products/:id
// @access  Private/Admin
const deleteProduct = factory.deleteOne(Product);

/**
 * @desc    Get top sold products
 * @route   GET /products/top
 * @access  Public
 */
const getTopSoldProducts = asyncHandler(async (req, res) => {
  const topProducts = await Product.aggregate([
    { $sort: { sold: -1 } },
    { $project: { title: 1, description: 1, price: 1 } },
    { $limit: 10 },
  ]);

  res.status(200).json({
    status: "success",
    data: topProducts,
  });
});

/**
 * @desc    Get first 5 products
 * @route   GET /products/first5
 * @access  Public
 */
const getFirst5Products = asyncHandler(async (req, res) => {
  const products = await Product.find().limit(5);

  res.status(200).json({
    status: "success",
    data: products,
  });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopSoldProducts,
  getFirst5Products,
};
