const User = require('../models/user');
const asyncHandler = require('express-async-handler');


// @desc    Add a address to addresses list
// @route   POST /addresses
// @access  Private/Auth User
exports.addToAddresses= asyncHandler(
    async (req, res, next) => {
        const user = await User.findByIdAndUpdate(req.user._id,
            {
                $addToSet: {addresses: req.body}
            },
            {new: true}
        );
        res.status(201).json({
            status: 'success',
            message: 'Address added successfully to your addresses list',
            data: user.addresses
        })    
    }
);


// @desc    Remove address from addresses list
// @route   DELETE /addresses/id
// @access  Private/Auth User
exports.removeFromAddresses = asyncHandler(
    async (req, res, next) => {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
            $pull: { addresses: {_id: req.params.id} },
            },
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            message: 'Address removed successfully from your addresses list.',
            data: user.addresses,
        });   
    }
);


// @desc    Get logged user addresses list
// @route   GET /addresses
// @access  Private/Auth User
exports.getLoggedUserAddresses = asyncHandler(
    async(req, res, next) => {
        const user = await User.findById(req.user._id)
        .populate('addresses')

        res.status(200).json({
            status: 'success',
            count: user.addresses.length,
            data: user.addresses,
        });  
    }
);