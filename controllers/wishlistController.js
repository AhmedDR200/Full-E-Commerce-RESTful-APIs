const User = require('../models/user');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler');


// @desc    Add a product to wishlist
// @route   POST /wishlist
// @access  Private/Auth User
exports.addToWishlist = asyncHandler(
    async (req, res, next) => {
        const user = await User.findByIdAndUpdate(req.user._id,
            {
                $addToSet: {wishlist: req.body.prodId}
            },
            {new: true}
        );
        res.status(201).json({
            status: 'success',
            message: 'Product added successfully to your wishlist',
            data: user.wishlist
        })    
    }
);