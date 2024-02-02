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
    cart.totalCartPrice = totalPrice;
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
        calcTotalCartPrice(cart)
        await cart.save();

        res.status(200).json({
            status: 'success',
            message: 'Product added to cart successfully',
            results: cart.cartItems.length,
            data: cart
        });
    }
);


// @desc      Get user cart
// @route     GET /cart
// @access    Private/Auth User
exports.getUserCart = asyncHandler(
    async(req, res, next) => {
        const cart = await Cart.findOne({
            user: req.user._id
        })

        if(!cart){
            return next(new ApiError(`There is no cart for this user id ${req.user._id} !`, 404))
        }

        res.status(200).json({
            status: 'success',
            results: cart.cartItems.length,
            data: cart
        });
    }
);


// @desc      Delete item from cart
// @route     DELETE /cart/:itemId
// @access    Private/Auth User
exports.deleteCartItem = asyncHandler(
    async(req, res, next) => {
        const cart = await Cart.findOneAndUpdate({
            user: req.user._id
        },
        {
            $pull: { cartItems: {_id: req.params.itemId} }
        },{new: true}
        );

        calcTotalCartPrice(cart);
        cart.save();

        res.status(200).json({
            status: 'success',
            results: cart.cartItems.length,
            data: cart
        });
    }
);


// @desc      Delete all item from cart
// @route     DELETE /cart
// @access    Private/Auth User
exports.clearCart = asyncHandler(
    async(req, res, next) => {
        await Cart.findOneAndDelete({
            user: req.user._id
        });

        res.status(204).send();
    }
);


// @desc      Update item quantity in cart
// @route     PATCH /cart/:itemId
// @access    Private/Auth User
exports.updateCartItemQuantity = asyncHandler(
    async(req, res, next) => {
        const { quantity } = req.body;
        const cart = await Cart.findOneAndUpdate({user: req.user._id});
        if(!cart){
            return next(new ApiError(`There is no cart for this user ${req.user._id}`, 404))
        }

        const itemIndex = cart.cartItems.findIndex(
            item => item._id.toString() === req.params.itemId
        );

        if(itemIndex > -1){
            const cartItem = cart.cartItems[itemIndex];
            cartItem.quantity = quantity;

            cart.cartItems[itemIndex] = cartItem;
        }
        else{
            return next(new ApiError(`There is no item for this id ${req.params.itemId}`, 404))
        }

        calcTotalCartPrice(cart);

        res.status(200).json({
            status: 'success',
            results: cart.cartItems.length,
            data: cart
        });
    }
)