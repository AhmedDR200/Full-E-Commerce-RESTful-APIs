const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: [2, 'Title must be at least 2 characters long'],
        maxlength: [100, 'Title can not be more than 100 characters long']
    },
    rating: {
        type: Number,
        required: true,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must can not be more than 5']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a product']
    },
},{
    timestamps: true,
    versionKey: false
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;