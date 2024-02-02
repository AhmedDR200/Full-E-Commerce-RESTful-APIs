const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const factory = require('./handelers');
const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');


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
        if(order){
            const bulkOption = cart.cartItems.map(item => ({
                updateOne: {
                    filter: {_id: item.product},
                    update: {$inc: {
                        quantity: -item.quantity,
                        sold: +item.quantity
                    }}
                }
            }))
            await Product.bulkWrite(bulkOption, {})
         // clear cart depend on cartId
            await Cart.findByIdAndDelete(req.params.cartId)
        };

        res.status(201).json({
            status: 'success',
            data: order
        });
    }
);


// @desc    Get all orders
// @route   GET /orders
// @access  Private/Admin
exports.getAllOrders = factory.getAll(Order);


// @desc    Get a order
// @route   GET /orders/:id
// @access  Private/Admin
exports.getOrder = factory.getOne(Order);


// @desc    Get all orders for logged user
// @route   GET /orders
// @access  Private/Auth User
exports.filterOrderForLoggedUser = asyncHandler(
    async(req, res, next) => {
        if(req.user.role === 'user') req.filterObj = { user: req.user._id };
        next();
    }
);