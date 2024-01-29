const express = require('express');
const router = express.Router();

const {
    getReview,
    getReviews,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController.js.js');

const {
    createReviewValidator,
    updateReviewValidator,
    deleteReviewValidator,
    getReviewValidator
} = require('../validators/reviewValidator.js');

const { protect, allowedTo } = require("../controllers/authController.js");


router.route('/')
.get(getReviews)
.post(
    protect,
    allowedTo('user'),
    createReviewValidator,
    createReview
);

router.route('/:id')
.get(getReviewValidator, getReview)
.patch(
    protect,
     allowedTo('user'),
    updateReviewValidator,
    updateReview
)
.delete(
    protect,
    allowedTo('admin', 'user'),
    // deleteBrandValidator,
    deleteReview
);



module.exports = router;