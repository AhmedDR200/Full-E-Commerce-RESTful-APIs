const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const Cart = require('../models/cart');
const Product = require('../models/product');


// calculate total cart price
const calcTotalCartPrice = (cart) =>{
    let totalPrice = 0;
    cart.cartItems.forEach(item => {
        totalPrice += item.quantity * item.price
    });

    return totalPrice;
};


// @desc      Add item to cart
// @route     POST /cart
// @access    Private/Auth User
exports.addItemToCart = asyncHandler(
    async (req, res, next) => {
        const { prodId, color } = req.body;
        const product = await Product.findById(prodId)
        // get cart for logged user
        let cart = await Cart.findOne({user: req.user._id});
        if(!cart){
            cart = await Cart.create({
                user: req.user._id,
                cartItems: [{ product: prodId, color, price: product.price }]
            });
        }else{
            // product exist in cart, update product quntity
            const productExist = cart.cartItems.findIndex(
                item => item.product.toString() === prodId
                && item.color === color
            );
            if(productExist > -1){
                const cartItem = cart.cartItems[productExist];
                cartItem.quantity += 1;
                cart.cartItems[productExist] = cartItem;
            }
            // push product to cartItems array
            else{
                cart.cartItems.push({
                    product: prodId, color, price: product.price
                });
            }
        }
        const totalPrice = calcTotalCartPrice(cart)
        cart.totalCartPrice = totalPrice;
        await cart.save();

        res.status(200).json({
            status: 'success',
            message: 'Product added to cart successfully',
            data: cart
        })
    }
);