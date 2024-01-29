const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    rating: {
        type: Number,
        required: [true, 'Review must have a rating'],
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

// Populate user and product with Mongoose middleware
reviewSchema.pre(/^find/, function(next){
    this.populate({
        path: 'user',
        select: 'name'
    }).populate({
        path: 'product',
        select: 'title'
    });
    next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;