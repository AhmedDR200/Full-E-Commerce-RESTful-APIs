const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const factory = require('./handelers');
const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


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


// @desc    Update order paid status to paid
// @route   PUT /orders/:id/pay
// @access  Private/Admin
exports.updateOrderToPaid = asyncHandler(
    async(req, res, next) => {
        const order = await Order.findById(req.params.id);
        if(!order){
            return next(new ApiError("Threr is no such a order for this user id"));
        }
        // update order to paid
        order.isPaid = true;
        order.paidAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json({
            status: 'success',
            data: updatedOrder
        });
    }
);


// @desc    Update order delivred status to true
// @route   PUT /orders/:id/delivr
// @access  Private/Admin
exports.updateOrderToDelivred = asyncHandler(
    async(req, res, next) => {
        const order = await Order.findById(req.params.id);
        if(!order){
            return next(new ApiError("Threr is no such a order for this user id"));
        }
        // update order to paid
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json({
            status: 'success',
            data: updatedOrder
        });
    }
);


// @desc    Get checkout session from stripe
// @route   PUT /orders/checkout-session/:cartId
// @access  Private/Auth User
exports.checkoutSession = asyncHandler(async (req, res, next) => {
    // app settings
    const taxPrice = 0;
    const shippingPrice = 0;
  
    // 1) Get cart depend on cartId
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return next(
        new ApiError(`There is no such cart with id ${req.params.cartId}`, 404)
      );
    }
  
    // 2) Get order price depend on cart price "Check if coupon apply"
    const cartPrice = cart.totalPriceAfterDiscount
      ? cart.totalPriceAfterDiscount
      : cart.totalCartPrice;
  
    const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
  
    // 3) Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
            {
                price_data: {
                    currency: 'egp', // replace with your currency
                    product_data: {
                        name: req.user.name,
                    },
                    unit_amount: totalOrderPrice * 100, // amount in cents
                },
                quantity: 1,
            },
      ],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/orders`,
      cancel_url: `${req.protocol}://${req.get('host')}/cart`,
      customer_email: req.user.email,
      client_reference_id: req.params.cartId,
      metadata: req.body.shippingAddress,
    });
  
    // 4) send session to response
    res.status(200).json({ status: 'success', session });
});


const createCardOrder = async (session) => {
    const cartId = session.client_reference_id;
    const shippingAddress = session.metadata;
    const oderPrice = session.amount_total / 100;
  
    const cart = await Cart.findById(cartId);
    const user = await User.findOne({ email: session.customer_email });
  
    // 3) Create order with default paymentMethodType card
    const order = await Order.create({
      user: user._id,
      cartItems: cart.cartItems,
      shippingAddress,
      totalOrderPrice: oderPrice,
      isPaid: true,
      paidAt: Date.now(),
      paymentMethodType: 'card',
    });
  
    // 4) After creating order, decrement product quantity, increment product sold
    if (order) {
      const bulkOption = cart.cartItems.map((item) => ({
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
        },
      }));
      await Product.bulkWrite(bulkOption, {});
  
      // 5) Clear cart depend on cartId
      await Cart.findByIdAndDelete(cartId);
    }
};


// @desc    This webhook will run when stripe payment success paid
// @route   POST /webhook-checkout
// @access  Private/Auth User
exports.webhookCheckout = asyncHandler(async (req, res, next) => {
    const sig = req.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === 'checkout.session.completed') {
      //  Create order
      createCardOrder(event.data.object);
    }
  
    res.status(200).json({ received: true });
});