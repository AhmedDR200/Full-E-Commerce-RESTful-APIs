const Coupon = require('../models/coupon');
const factory = require('./handelers')


// @desc    Fetch all coupons
// @route   GET /coupons
// @access  Private/Admin
const getAllCoupons = factory.getAll(Coupon)


// @desc    create a coupon
// @route   POST /coupons
// @access  Private/Admin
const createCoupon = factory.createOne(Coupon)


// @desc    Fetch a coupon
// @route   GET /coupons/:id
// @access  Private/Admin
const getCoupon = factory.getOne(Coupon)


// @desc    Update a coupon
// @route   PUT /coupons/:id
// @access  Private/Admin
const updateCoupon = factory.updateOne(Coupon)


// @desc    Delete a coupon
// @route   DELETE /coupons/:id
// @access  Private/Admin
const deleteCoupon = factory.deleteOne(Coupon)


module.exports = {
    getAllCoupons,
    createCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
};