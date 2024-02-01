const User = require('../models/user');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler');


// @desc    Add a product to wishlist
// @route   POST /wishlist
// @access  Private/Auth User
exports.addToWishlist = asyncHandler(
    // $addToSet => add prodId to the array one time
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


// @desc    Remove product from wishlist
// @route   DELETE /wishlist/prodId
// @access  Private/Auth User
exports.removeFromWishlist = asyncHandler(
    async (req, res, next) => {
        // $pull => remove productId from wishlist array if productId exist
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
            $pull: { wishlist: req.params.prodId },
            },
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            message: 'Product removed successfully from your wishlist.',
            data: user.wishlist,
        });   
    }
);