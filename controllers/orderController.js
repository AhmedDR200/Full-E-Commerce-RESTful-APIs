const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const factory = require('./handelers');
const Order = require('../models/order');
const Cart = require('../models/cart');


// @desc    Create cash order
// @route   POST /orders/:cartId
// @access  Private/Auth User
exports.createCashOrder = asyncHandler(
    async(req, res, next) => {
        // app settings
        const taxPrice = 0;
        const shippingPrice = 0;
        // get cart depend on cartId
        const cart = await Cart.findById(req.params.cartId);
        if(!cart){
            new ApiError(`There is no such cart with id ${req.params.cartId}`, 404)
        }
        // get order price depend on cart price "check if coupon apllied"
        const cartPrice = cart.totalPriceAfterDiscount 
            ? cart.totalPriceAfterDiscount
            : cart.totalCartPrice;

        const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
        // create order with cash
        const order = await Order.create({
            user: req.user._id,
            cartItems: cart.cartItems,
            shippingAddress: req.body.shippingAddress,
            totalOrderPrice
        });
        // after creating order decrement quantity, increment sold
        // clear cart depend on cartId
    }
)