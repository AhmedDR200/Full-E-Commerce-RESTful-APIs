const express = require('express');
const router = express.Router();

const {
    addItemToCart,
    getUserCart,
    deleteCartItem,
    clearCart,
    updateCartItemQuantity,
    applyCoupon
} = require('../controllers/cartController');


const { protect, allowedTo } = require("../controllers/authController");

router.use(protect, allowedTo('user'))

router.route('/')
.get(getUserCart)
.post(addItemToCart)
.delete(clearCart);

router.route('/:itemId')
.delete(deleteCartItem)
.patch(updateCartItemQuantity)

router.put('/applyCoupon', applyCoupon)

module.exports = router;