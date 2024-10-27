const mongoose = require('mongoose');
const Product = require('./product')


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
    });
    next();
});

reviewSchema.statics.calcAverageRatingsQuantity =async function(prodId){
  const result = await this.aggregate([
    // stage 1 => get all reviews in specific product
    {
        $match: {product: prodId}
    },
    // stage 2 => grouping reviews based on prodId
    {
        $group: {
            _id: '$product',
            avgRating: {$avg: '$rating'},
            ratingsQuantity: {$sum: 1}
        }
    }
  ]);
  if(result.length > 0){
    await Product.findByIdAndUpdate(prodId, {
        ratingsAverage: result[0].avgRating,
        ratingsQuantity: result[0].ratingsQuantity,
    });
  }else{
    await Product.findByIdAndUpdate(prodId, {
        ratingsAverage: 0,
        ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save', async function(){
    await this.constructor.calcAverageRatingsQuantity(this.product)
});

reviewSchema.post('remove', async function(){
    await this.constructor.calcAverageRatingsQuantity(this.product)
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;