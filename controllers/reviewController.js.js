const Review = require('../models/review');
const factory = require('./handelers')



// @desc    Fetch all reviews
// @route   GET /reviews
// @access  Public
const getReviews = factory.getAll(Review, 'Review');


// Middleware to set product id to body
const setProdIdToBody = (req, res, next) => {
    if (!req.body.product) req.body.product = req.params.prodId;
    if (!req.body.user) req.body.user = req.params._id;
    next();
};

// @desc    create a review
// @route   POST /reviews
// @access  Private/Auth user
const createReview = factory.createOne(Review);


// nested route
const createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.prodId) filterObject = { product: req.params.prodId }
    req.filterObject = filterObject;
    next();
};


// @desc    Fetch a review
// @route   GET /reviews/:id
// @access  Public
const getReview = factory.getOne(Review);


// @desc    Update a review
// @route   PUT /reviews/:id
// @access  Private/Auth user
const updateReview = factory.updateOne(Review);


// @desc    Delete a review
// @route   DELETE /reviews/:id
// @access  Private/Auth user
const deleteReview = factory.deleteOne(Review);


module.exports = {
    getReviews,
    createReview,
    getReview,
    updateReview,
    deleteReview,
    createFilterObj,
    setProdIdToBody
};